// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'dessilenciar',
  aliases: ['unmute'],
  descricao: 'Remove o silêncio de um membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Mencione quem dessilenciar.');
    }
    const num = jidParaNumero(alvo);
    const eraSilenciado = db.getSilenciado(jid, alvo);
    db.removerSilenciado(jid, alvo);
    db.resetarSilencioAvisos(jid, alvo);
    await reagir(sock, msg, eraSilenciado ? '🔊' : 'ℹ️');
    await responderPV(sock, autor,
      eraSilenciado
        ? `🔊 @${num} foi dessilenciado.`
        : `ℹ️ @${num} não estava silenciado.`
    );
  }
};
