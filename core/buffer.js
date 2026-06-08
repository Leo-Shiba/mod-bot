// Autoria Leo-Shiba GitHub
const _buffer = new Map();
const MAX = 50;
const EXPIRY_MS = 60 * 60 * 1000 * 60; // 60 horas — limite do WhatsApp para apagar

function registrar(jid, key, sender) {
  if (!_buffer.has(jid)) _buffer.set(jid, []);
  const arr = _buffer.get(jid);
  arr.push({ key, sender, ts: Date.now() });
  if (arr.length > MAX) arr.shift();
}

function pegarUltimas(jid, n) {
  const agora = Date.now();
  const validas = (_buffer.get(jid) || []).filter(m => agora - m.ts < EXPIRY_MS);
  return validas.slice(-Math.min(n, MAX));
}

module.exports = { registrar, pegarUltimas };