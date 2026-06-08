// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');

module.exports = {
  nome: 'resetar',
  aliases: ['clearwarn'],
  descricao: 'Zera os avisos de um membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '⚠️ Mencione quem resetar.');
    }
    db.resetarAvisos(jid, alvo);
    db.limparHistoricoAvisos(jid, alvo);
    await reagir(sock, msg, '✅');
    await responderPV(sock, autor, `✅ Avisos de @${jidParaNumero(alvo)} zerados.`);
  },
};
