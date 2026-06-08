// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'promover', aliases: ['promote'],
  descricao: 'Promove um membro a admin.',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, autor }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Mencione quem promover.');
    }
    try {
      await sock.groupParticipantsUpdate(jid, [alvo], 'promote');
      await reagir(sock, msg, '⬆️');
      await responderPV(sock, autor, `⬆️ @${jidParaNumero(alvo)} agora é admin.`);
    } catch (e) {
      await reagir(sock, msg, '❌');
      await responderPV(sock, autor, `❌ Não foi possível promover: ${e.message}`);
    }
  }
};
