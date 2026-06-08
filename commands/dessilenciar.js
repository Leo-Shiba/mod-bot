// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero } = require('../core/utils');
module.exports = {
  nome: 'dessilenciar',
  aliases: ['unmute'],
  descricao: 'Remove o silêncio de um membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) return sock.sendMessage(jid, { text: '❌ Mencione quem dessilenciar.' });
    const num = jidParaNumero(alvo);
    const eraSilenciado = db.getSilenciado(jid, alvo);
    db.removerSilenciado(jid, alvo);
    db.resetarSilencioAvisos(jid, alvo);
    if (!eraSilenciado) return sock.sendMessage(jid, { text: `ℹ️ @${num} não estava silenciado.`, mentions: [alvo] });
    await sock.sendMessage(jid, {
      text: `🔊 @${num} foi dessilenciado.`,
      mentions: [alvo]
    });
  }
};
