// Autoria Leo-Shiba GitHub
function extrairMencionado(msg) {
  const mencoes = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (mencoes.length) return mencoes[0];
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant;
  if (quoted) return quoted;
  return null;
}
function jidParaNumero(jid) { return jid.split('@')[0].replace(/[.:]\d+$/, ''); }
function formatarHora(ts) { return new Date(ts).toLocaleString('pt-BR', { timeZone: 'America/Belem' }); }

async function reagir(sock, msg, emoji) {
  await sock.sendMessage(msg.key.remoteJid, { react: { text: emoji, key: msg.key } }).catch(() => {});
}
async function responderPV(sock, autor, texto, extra = {}) {
  await sock.sendMessage(autor, { text: texto, ...extra }).catch(() => {});
}

module.exports = { extrairMencionado, jidParaNumero, formatarHora, reagir, responderPV };
