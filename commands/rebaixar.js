// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'rebaixar', aliases: ['demote'],
  descricao: 'Remove o admin de um membro.',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, autor }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Mencione quem rebaixar.');
    }
    let meta;
    try { meta = await sock.groupMetadata(jid); } catch {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Erro ao obter informações do grupo.');
    }
    const alvoNum = alvo.split('@')[0].split(':')[0];
    const participante = meta.participants.find(p => p.id.split('@')[0].split(':')[0] === alvoNum);
    if (!participante) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Membro não encontrado no grupo.');
    }
    if (!participante.admin) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, `❌ @${jidParaNumero(alvo)} não é admin.`);
    }
    if (participante.admin === 'superadmin') {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Não é possível rebaixar o dono do grupo.');
    }
    try {
      await sock.groupParticipantsUpdate(jid, [alvo], 'demote');
      await reagir(sock, msg, '⬇️');
      await responderPV(sock, autor, `⬇️ @${jidParaNumero(alvo)} não é mais admin.`);
    } catch (e) {
      await reagir(sock, msg, '❌');
      await responderPV(sock, autor, `❌ Não foi possível rebaixar: ${e.message}`);
    }
  }
};
