// Autoria Leo-Shiba GitHub
const _buffer = new Map();
const MAX = 50;
function registrar(jid, key, sender) {
  if (!_buffer.has(jid)) _buffer.set(jid, []);
  const arr = _buffer.get(jid);
  arr.push({ key, sender, ts: Date.now() });
  if (arr.length > MAX) arr.shift();
}
function pegarUltimas(jid, n) { return (_buffer.get(jid) || []).slice(-Math.min(n, MAX)); }
module.exports = { registrar, pegarUltimas };
