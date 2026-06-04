// Autoria Leo-Shiba GitHub
const config = require('../config');
const _ultimoAviso = new Map();
setInterval(() => { const limite = Date.now() - 2 * 60 * 60 * 1000; for (const [k, v] of _ultimoAviso) { if (v < limite) _ultimoAviso.delete(k); } }, 2 * 60 * 60 * 1000);
function podaAvisar(chave, intervalMs = 60 * 60 * 1000) {
  const agora = Date.now();
  if (agora - (_ultimoAviso.get(chave) || 0) < intervalMs) return false;
  _ultimoAviso.set(chave, agora);
  return true;
}
const _jidCache = new Map();
const _donosIds = new Set();
let _sock = null;
function ehDono(numero) { return config.donos.includes(numero) || _donosIds.has(numero); }
async function inicializarDonos(sock) {
  _sock = sock; _donosIds.clear();
  for (const numero of config.donos) { _donosIds.add(numero); }
  console.log(`[donos] ${_donosIds.size} dono(es) inicializado(s)`);
}
async function resolverJid(sock, numero) {
  if (_jidCache.has(numero)) return _jidCache.get(numero);
  try {
    const results = await sock.onWhatsApp(numero);
    const info = Array.isArray(results) ? results[0] : results;
    if (info?.exists && info.jid) { _jidCache.set(numero, info.jid); return info.jid; }
  } catch {}
  return `${numero}@s.whatsapp.net`;
}
async function notificar(sock, texto) {
  for (const numero of config.donos) {
    try { const jid = await resolverJid(sock, numero); await sock.sendMessage(jid, { text: texto }); } catch (e) { console.error('[notificar]', e.message); }
  }
}
module.exports = { notificar, podaAvisar, inicializarDonos, ehDono };
