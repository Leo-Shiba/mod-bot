// Autoria Leo-Shiba GitHub
const _ultimoAviso = new Map();
setInterval(() => {
  const limite = Date.now() - 2 * 60 * 60 * 1000;
  for (const [k, v] of _ultimoAviso) { if (v < limite) _ultimoAviso.delete(k); }
}, 2 * 60 * 60 * 1000);

function podaAvisar(chave, intervalMs = 60 * 60 * 1000) {
  const agora = Date.now();
  if (agora - (_ultimoAviso.get(chave) || 0) < intervalMs) return false;
  _ultimoAviso.set(chave, agora);
  return true;
}

module.exports = { podaAvisar };
