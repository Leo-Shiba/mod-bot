// Autoria Leo-Shiba GitHub
const RUIDO = ["Bad MAC", "Failed to decrypt", "Closing session", "MessageCounterError"];
function filtrarStream(stream) {
  const original = stream.write.bind(stream);
  stream.write = (chunk, encoding, cb) => {
    if (RUIDO.some(r => String(chunk).includes(r))) {
      if (typeof encoding === "function") encoding();
      else if (typeof cb === "function") cb();
      return true;
    }
    return original(chunk, encoding, cb);
  };
}
filtrarStream(process.stdout);
filtrarStream(process.stderr);

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const QRCode = require("qrcode");
const qrTerminal = require("qrcode-terminal");
const fs = require("fs");
const pino = require("pino");
const db = require("./core/database");
const handler = require("./core/commandHandler");
const buffer = require("./core/buffer");
const { jidParaNumero } = require("./core/utils");

const _floodMap = new Map();
function checkFlood(jidGrupo, numero, limite = 5) {
  const key = `${jidGrupo}:${numero}`;
  const agora = Date.now();
  if (!_floodMap.has(key)) _floodMap.set(key, []);
  const arr = _floodMap.get(key);
  while (arr.length && arr[0] < agora - 10_000) arr.shift();
  arr.push(agora);
  return arr.length >= limite;
}

const REGEX_LINK = /(https?:\/\/|wa\.me\/|bit\.ly\/|t\.me\/|chat\.whatsapp\.com)/i;
function temLink(texto) { return REGEX_LINK.test(texto); }

async function salvarQR(qrData) {
  qrTerminal.generate(qrData, { small: true });
  console.log("[QR] Escaneie o código acima no WhatsApp → Aparelhos conectados → Conectar aparelho");
  try {
    const png = await QRCode.toBuffer(qrData, { type: "png", width: 512, margin: 2 });
    fs.writeFileSync("./data/qrcode.png", png);
  } catch(e) { console.error("[QR]", e.message); }
}

// Fora de iniciar() — roda uma unica vez, sem acumular timers a cada reconexao
setInterval(() => {
  const limite = Date.now() - 10_000;
  for (const [k, arr] of _floodMap) {
    if (!arr.length || arr[arr.length - 1] < limite) _floodMap.delete(k);
  }
}, 60_000);

setInterval(() => {
  const expirados = db.getsilenciadosExpirados();
  for (const { jid_grupo, jid_membro } of expirados) {
    db.removerSilenciado(jid_grupo, jid_membro);
    db.resetarSilencioAvisos(jid_grupo, jid_membro);
  }
}, 60_000);

let _dbIniciado = false;
let _iniciando = false;
let _timerReconexao = null;
let _baileysVersion = null;
let _falhas428 = 0;
let _falhas440 = 0;

function agendarReconexao(ms) {
  if (_timerReconexao) return;
  _timerReconexao = setTimeout(() => { _timerReconexao = null; iniciar(); }, ms);
}

async function iniciar() {
  if (_iniciando) return;
  _iniciando = true;

  try {
    if (!_dbIniciado) {
      await db.init();
      _dbIniciado = true;
      handler.carregarComandos();
    }

    const { state, saveCreds } = await useMultiFileAuthState("./data/auth");

    if (!_baileysVersion) {
      const { version } = await fetchLatestBaileysVersion();
      _baileysVersion = version;
    }

    const sock = makeWASocket({
      version: _baileysVersion,
      auth: state,
      logger: pino({ level: "silent" }),
      keepAliveIntervalMs: 25_000,
      syncFullHistory: false,
      generateHighQualityLinkPreview: false,
      markOnlineOnConnect: false,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;
      if (qr) await salvarQR(qr);

      if (connection === "open") {
        _iniciando = false;
        _falhas428 = 0;
        _falhas440 = 0;
        console.log("Conectado ao WhatsApp!");
      }

      if (connection === "close") {
        _iniciando = false;
        const code = lastDisconnect?.error?.output?.statusCode;
        const errMsg = lastDisconnect?.error?.message || "";
        console.log("[conexao] Fechada:", code, errMsg);

        if (code === DisconnectReason.connectionReplaced || code === 440) {
          _falhas440++;
          if (_falhas440 >= 3) {
            console.log("[conexao] 3 conflitos 440 seguidos — possível sessão duplicada. Encerrando para evitar bloqueio.");
            console.log("[conexao] Verifique se o WhatsApp Web está aberto em outro dispositivo ou se há outra instância do bot rodando.");
            process.exit(0);
          }
          const espera440 = 30_000 * _falhas440;
          console.log(`[conexao] Conflito (440, tentativa ${_falhas440}/3) — aguardando ${espera440 / 1000}s...`);
          agendarReconexao(espera440);
        } else if (code === 428) {
          _falhas428++;
          const espera = Math.min(30_000 * _falhas428, 300_000);
          console.log(`[conexao] Servidor encerrou (428, tentativa ${_falhas428}) — aguardando ${espera / 1000}s...`);
          agendarReconexao(espera);
        } else if ([DisconnectReason.loggedOut, 403].includes(code)) {
          console.log("[conexao] Deslogado — delete data/auth e reinicie.");
        } else {
          console.log("[conexao] Reconectando em 5s...");
          agendarReconexao(5_000);
        }
      }
    });

    sock.ev.on("group-participants.update", async ({ id: jid, participants, action }) => {
      handler.invalidarCacheAdmin(jid);
      if (!db.getGrupo(jid)) {
        let nome = jid;
        try { const meta = await sock.groupMetadata(jid); nome = meta.subject || jid; } catch {}
        db.registrarGrupo(jid, nome);
      }
      const g = db.getGrupo(jid);
      for (const participante of participants) {
        const num = jidParaNumero(participante);
        if (action === 'add' && g.boasvindas) {
          const texto = (g.boasvindas_texto || 'Bem-vindo ao grupo, {nome}! ')
            .replace('{nome}', `@${num}`);
          await sock.sendMessage(jid, { text: texto, mentions: [participante] }).catch(() => {});
        }
        if (action === 'remove' || action === 'leave') {
          db.resetarAvisos(jid, participante);
          db.limparHistoricoAvisos(jid, participante);
        }
        if ((action === 'remove' || action === 'leave') && g.saida) {
          const texto = (g.saida_texto || 'Ate mais, {nome}! ')
            .replace('{nome}', `@${num}`);
          await sock.sendMessage(jid, { text: texto, mentions: [participante] }).catch(() => {});
        }
      }
    });

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
      for (const msg of messages) {
        if (!msg.message) continue;

        const jid = msg.key.remoteJid;
        const isGroup = jid?.endsWith('@g.us');
        const autor = msg.key.participant || msg.key.remoteJid;
        buffer.registrar(jid, msg.key, autor);

        if (type !== "notify") continue;
        if (msg.key.fromMe) continue;

        if (isGroup) {
          if (!db.getGrupo(jid)) {
            let nome = jid;
            try { const meta = await sock.groupMetadata(jid); nome = meta.subject || jid; } catch {}
            db.registrarGrupo(jid, nome);
          }
          const g = db.getGrupo(jid);
          const texto = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || msg.message?.documentMessage?.caption || '';

          const admins = await handler.getAdmins(sock, jid);
          const isAdmin = admins.includes(autor);

          if (!isAdmin) {
            // Silenciado
            const silenciadoAte = db.getSilenciado(jid, autor);
            if (silenciadoAte) {
              try { await sock.sendMessage(jid, { delete: msg.key }); } catch {}
              const max = g?.maxavisos || 3;
              const avisos = db.addSilencioAviso(jid, autor);
              if (avisos >= max) {
                const num = jidParaNumero(autor);
                try { await sock.groupParticipantsUpdate(jid, [autor], 'remove'); } catch {}
                db.removerSilenciado(jid, autor);
                db.resetarSilencioAvisos(jid, autor);
                await sock.sendMessage(jid, {
                  text: `@${num} foi expulso por ignorar o silencio ${max}x.`,
                  mentions: [autor]
                }).catch(() => {});
              }
              continue;
            }

            // AntiFlood
            if (g?.antiflood && checkFlood(jid, autor, g?.floodlimite || 5)) {
              try { await sock.sendMessage(jid, { delete: msg.key }); } catch {}
              const num = jidParaNumero(autor);
              const max = g?.maxavisos || 3;
              const tot = db.addAviso(jid, autor);
              if (tot >= max) {
                db.resetarAvisos(jid, autor);
                _floodMap.delete(`${jid}:${autor}`);
                try { await sock.groupParticipantsUpdate(jid, [autor], 'remove'); } catch {}
                await sock.sendMessage(jid, {
                  text: `@${num} banido por flood (${max} avisos).`,
                  mentions: [autor]
                }).catch(() => {});
              } else {
                await sock.sendMessage(jid, {
                  text: `@${num} flood detectado — aviso *${tot}/${max}*.`,
                  mentions: [autor]
                }).catch(() => {});
              }
              continue;
            }

            // AntiLink
            if (g?.antilink && texto && temLink(texto)) {
              try { await sock.sendMessage(jid, { delete: msg.key }); } catch {}
              const num = jidParaNumero(autor);
              await sock.sendMessage(jid, {
                text: `@${num} links nao sao permitidos neste grupo.`,
                mentions: [autor]
              }).catch(() => {});
              continue;
            }

            // Anti-status
            if (g?.antistatus && msg.message?.groupStatusMentionMessage) {
              try { await sock.sendMessage(jid, { delete: msg.key }); } catch {}
              const num = jidParaNumero(autor);
              const max = g?.maxavisos || 3;
              const tot = db.addAviso(jid, autor);
              db.addHistoricoAviso(jid, autor, 'status compartilhado no grupo');
              if (tot >= max) {
                db.resetarAvisos(jid, autor);
                db.limparHistoricoAvisos(jid, autor);
                try { await sock.groupParticipantsUpdate(jid, [autor], 'remove'); } catch {}
                await sock.sendMessage(jid, {
                  text: `@${num} banido por compartilhar status no grupo (${max} avisos).`,
                  mentions: [autor]
                }).catch(() => {});
              } else {
                await sock.sendMessage(jid, {
                  text: `@${num} status no grupo não é permitido — aviso *${tot}/${max}*.`,
                  mentions: [autor]
                }).catch(() => {});
              }
              continue;
            }

            // Palavras proibidas
            if (texto) {
              const proibidas = db.listarPalavrasProibidas(jid);
              const textoLower = texto.toLowerCase();
              if (proibidas.some(p => textoLower.includes(p))) {
                try { await sock.sendMessage(jid, { delete: msg.key }); } catch {}
                const num = jidParaNumero(autor);
                await sock.sendMessage(jid, {
                  text: `@${num} palavra proibida detectada.`,
                  mentions: [autor]
                }).catch(() => {});
                continue;
              }
            }
          }
        }

        try {
          await handler.tratarMensagem({ sock, msg, db, buffer });
        } catch (e) {
          console.error("[mensagem]", e);
        }
      }
    });

  } catch (e) {
    console.error("[iniciar] Erro:", e.message);
    _iniciando = false;
    agendarReconexao(10_000);
  }
}

iniciar();
