// Autoria Leo-Shiba GitHub
const { notificar, podaAvisar, ehDono } = require('./notificar');
const _dados = new Map();
const INATIVO_MS = 60 * 60 * 1000;
setInterval(() => { const limite = Date.now() - INATIVO_MS; for (const [k, v] of _dados) { if (v.ultimoUso < limite) _dados.delete(k); } }, INATIVO_MS);
function getDados(numero) { if (!_dados.has(numero)) { _dados.set(numero, { cmds: [], violacoes: [], bloqueadoAte: 0, ultimoUso: Date.now() }); } return _dados.get(numero); }
function limpar(arr, wMs) { const l = Date.now() - wMs; while (arr.length && arr[0] < l) arr.shift(); }
function checarRateLimit(numero) { const d = getDados(numero); const a = Date.now(); if (d.bloqueadoAte > a) return true; limpar(d.cmds, 10_000); d.cmds.push(a); if (d.cmds.length > 8) { d.bloqueadoAte = a + 60_000; return 'spam'; } return false; }
async function processar({ sock, numero, nomeCmd, temPermissao, jid }) {
  if (ehDono(numero)) return false;
  const rs = checarRateLimit(numero);
  if (rs === 'spam') { await sock.sendMessage(jid, { text: '⏳ Aguarde 1 minuto.' }); return true; }
  if (rs === true) return true;
  if (!temPermissao) { const d = getDados(numero); limpar(d.violacoes, 5 * 60_000); d.violacoes.push(Date.now()); }
  return false;
}
module.exports = { processar };
