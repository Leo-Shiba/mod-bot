// Autoria Leo-Shiba GitHub
const RUIDO = ['Bad MAC', 'Failed to decrypt', 'Closing session', 'MessageCounterError'];
function filtrarStream(stream) {
  const original = stream.write.bind(stream);
  stream.write = (chunk, encoding, cb) => {
    if (RUIDO.some(r => String(chunk).includes(r))) {
      if (typeof encoding === 'function') encoding();
      else if (typeof cb === 'function') cb();
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
} = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const pino = require('pino');

const db = require('./core/database');
const handler = require('./core/commandHandler');
const { invalidarCacheAdmin } = handler;
const buffer = require('./core/buffer');
const { notificar, podaAvisar, inicializarDonos } = require('./core/notificar');
const { jidParaNumero } = require('./core/utils');

function agora() {
  return new Date().toLocaleString('pt-BR', { timeZone: 'America/Belem' });
}

const _floodMap = new Map();
function checkFlood(jidGrupo, numero) {
  const key = `${jidGrupo}:${numero}`;
  const agora = Date.now();
  if (!_floodMap.has(key)) _floodMap.set(key, []);
  const arr = _floodMap.get(key);
  while (arr.length && arr[0] < agora - 10_000) arr.shift();
  arr.push(agora);
  return arr.length >= 5;
}

const REGEX_LINK = /(https?:\/\/|wa\.me\/|bit\.ly\/|t\.me\/|chat\.whatsapp\.com)/i;
function temLink(texto) { return REGEX_LINK.test(texto); }

let _loopIniciado = false;

anync function iniciar() {
  handler.carregarComandos();
  const { state, saveCreds } = await useMultiFileAuthState('./data/auth');
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({ version, auth: state, logger: pino({ level: 'silent' }), printQRInTerminal: false });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) { console.log('\nEscaneie o QR Code abaixo:\n'); qrcode.generate(qr, { small: true }); }
    if (connection === 'open') {
      console.log('✅ Conectado ao WhatsApp!');
      await inicializarDonos(sock);
    }
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) iniciar();
    }
  });
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;
      try { await handler.tratarMensagem({ sock, msg, db, buffer }); } catch (e) { console.error('[mensagem]', e); }
    }
  });
}
iniciar();
