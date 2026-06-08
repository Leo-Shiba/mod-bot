// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'setboasvindas',
  aliases: ['setwelcome'],
  descricao: 'Define a mensagem de boas-vindas. Use {nome} para mencionar o membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, args, textoArgs, db }) => {
    if (!db.getGrupo(jid)) db.registrarGrupo(jid, '');

    if (!args.length) {
      const atual = db.getGrupo(jid)?.boasvindas_texto || '(padrão)';
      await reagir(sock, msg, '👋');
      return responderPV(sock, autor, `👋 Boas-vindas atual:\n${atual}`);
    }

    if (args[0] === 'reset') {
      db.setConfig(jid, 'boasvindas_texto', '');
      await reagir(sock, msg, '✅');
      return responderPV(sock, autor, '✅ Mensagem de boas-vindas resetada para o padrão.');
    }

    db.setConfig(jid, 'boasvindas_texto', textoArgs);
    await reagir(sock, msg, '✅');
    await responderPV(sock, autor, `✅ Boas-vindas atualizada!\nPreview: ${textoArgs.replace('{nome}', '@voce')}`);
  },
};
