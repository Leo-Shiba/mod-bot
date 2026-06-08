// Autoria Leo-Shiba GitHub
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { reagir } = require('./utils');
const seguranca = require('./seguranca');
const comandos = new Map();
const _adminCache = new Map();
const ADMB_TTL = 60_000;

function invalidarCacheAdmin(j) { _adminCache.delete(j); }
setInterval(() => {
  const limite = Date.now() - ADMB_TTL;
  for (const [k, v] of _adminCache) {
    if (v.ts < limite) _adminCache.delete(k);
  }
}, ADMB_TTL);

async function getAdmins(sock, jid) {
  const cache = _adminCache.get(jid);
  if (cache && Date.now() - cache.ts < ADMB_TTL) return cache.admins;
  const meta = await sock.groupMetadata(jid).catch(() => null);
  const admins = meta?.participants.filter(p => p.admin).map(p => p.id) || [];
  _adminCache.set(jid, { admins, ts: Date.now() });
  return admins;
}

function carregarComandos() {
  comandos.clear();
  const dir = path.join(__dirname, '..', 'commands');
  for (const arquivo of fs.readdirSync(dir)) {
    if (!arquivo.endsWith('.js') || arquivo.startsWith('_')) continue;
    delete require.cache[require.resolve(path.join(dir, arquivo))];
    const cmd = require(path.join(dir, arquivo));
    if (!cmd?.nome || typeof cmd.executar !== 'function') continue;
    comandos.set(cmd.nome.toLowerCase(), cmd);
    for (const alias of cmd.aliases || []) comandos.set(alias.toLowerCase(), cmd);
  }
}

function listar() { return [...new Set(comandos.values())]; }

async function tratarMensagem({ sock, msg, db, buffer }) {
  const jid = msg.key.remoteJid;
  const isGroup = jid?.endsWith('@g.us');
  const texto = msg.message?.conversation ||
                msg.message?.extendedTextMessage?.text ||
                msg.message?.imageMessage?.caption ||
                msg.message?.videoMessage?.caption ||
                msg.message?.documentMessage?.caption || '';
  if (!texto.startsWith(config.prefixo)) return;
  const partes = texto.slice(config.prefixo.length).trim().split(/\s+/);
  const nome = partes.shift()?.toLowerCase();
  const args = partes;
  const textoArgs = texto.slice(config.prefixo.length).replace(/^\S+/, '').replace(/^\s/, '');
  const cmd = comandos.get(nome);
  const autor = msg.key.participant || msg.key.remoteJid;
  if (!cmd) return;

  if (!isGroup) return;

  let temPermissao = true;
  if (cmd.apenasAdmin) {
    const admins = await getAdmins(sock, jid);
    temPermissao = admins.includes(autor);
  }

  if (cmd.botPrecisaAdmin && isGroup) {
    try {
      const meta = await sock.groupMetadata(jid);
      const botNumero = (sock.user?.id || '').split('@')[0].split(':')[0];
      const botParticipant = meta.participants.find(p =>
        p.id.split('@')[0].split(':')[0] === botNumero
      );
      if (botParticipant && !botParticipant.admin) {
        await sock.sendMessage(jid, { text: '⚠️ Preciso ser admin do grupo para usar este comando.' });
        return;
      }
    } catch {}
  }

  const bloq = await seguranca.processar({ sock, numero: autor.split('@')[0], jid });
  if (bloq) return;
  if (!temPermissao) { await reagir(sock, msg, '❌'); return; }

  try {
    await cmd.executar({ sock, msg, jid, autor, args, textoArgs, db, buffer, nomeCmd: nome, comandos: listar });
  } catch (err) { await sock.sendMessage(jid, { text: '❌ Erro: ' + err.message }); }
}

module.exports = { carregarComandos, tratarMensagem, listar, invalidarCacheAdmin, getAdmins };
