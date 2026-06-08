// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'setregras',
  aliases: ['setrules'],
  descricao: 'Define as regras do grupo.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, textoArgs, db }) => {
    if (!textoArgs) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '⚠️ Uso: !setregras <texto das regras>');
    }
    db.setConfig(jid, 'regras', textoArgs);
    await reagir(sock, msg, '✅');
    await responderPV(sock, autor, '✅ Regras do grupo atualizadas!');
  },
};
