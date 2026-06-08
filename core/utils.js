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
module.exports = { extrairMencionado, jidParaNumero, formatarHora };
