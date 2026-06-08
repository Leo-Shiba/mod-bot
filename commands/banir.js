// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'banir', aliases: ['kick'],
  descricao: 'Remove um membro do grupo.',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, autor, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '⚠️ Mencione quem banir.');
    }
    try {
      await sock.groupParticipantsUpdate(jid, [alvo], 'remove');
      db.resetarAvisos(jid, alvo);
      db.limparHistoricoAvisos(jid, alvo);
      await reagir(sock, msg, '🚫');
      await responderPV(sock, autor, `🚫 @${jidParaNumero(alvo)} removido do grupo.`);
    } catch (e) {
      await reagir(sock, msg, '❌');
      await responderPV(sock, autor, '❌ Erro: ' + e.message);
    }
  }
};
