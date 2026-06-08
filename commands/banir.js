// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero } = require('../core/utils');
module.exports = {
  nome: 'banir', aliases: ['kick'],
  descricao: 'Remove um membro do grupo.',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) return sock.sendMessage(jid, { text: '⚠️ Mencione quem banir.' });
    try {
      await sock.groupParticipantsUpdate(jid, [alvo], 'remove');
      db.resetarAvisos(jid, alvo);
      await sock.sendMessage(jid, { text: `✅ @${jidParaNumero(alvo)} removido.`, mentions: [alvo] });
    } catch (e) { await sock.sendMessage(jid, { text: '❌ Erro: ' + e.message }); }
  }
};
