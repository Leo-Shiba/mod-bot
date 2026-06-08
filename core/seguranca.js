// Autoria Leo-Shiba GitHub
const _dados = new Map();
const INATIVO_MS = 60 * 60 * 1000;

setInterval(() => {
  const limite = Date.now() - INATIVO_MS;
  for (const [k, v] of _dados) {
    if (v.ultimoUso < limite) _dados.delete(k);
  }
}, INATIVO_MS);

function getDados(numero) {
  if (!_dados.has(numero)) {
    _dados.set(numero, { cmds: [], bloqueadoAte: 0, ultimoUso: Date.now() });
  }
  return _dados.get(numero);
}

function limpar(arr, wMs) {
  const l = Date.now() - wMs;
  while (arr.length && arr[0] < l) arr.shift();
}

function checarRateLimit(numero) {
  const d = getDados(numero);
  const agora = Date.now();
  d.ultimoUso = agora;
  if (d.bloqueadoAte > agora) return true;
  limpar(d.cmds, 10_000);
  d.cmds.push(agora);
  if (d.cmds.length > 8) {
    d.bloqueadoAte = agora + 60_000;
    return 'spam';
  }
  return false;
}

async function processar({ sock, numero, jid }) {
  const rs = checarRateLimit(numero);
  if (rs === 'spam') {
    await sock.sendMessage(jid, { text: '⏳ Muitos comandos. Aguarde 1 minuto.' });
    return true;
  }
  if (rs === true) return true;
  return false;
}

function limparTudo() { _dados.clear(); }

module.exports = { processar, limparTudo };
