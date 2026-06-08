// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'setsaida',
  aliases: ['setleave'],
  descricao: 'Define a mensagem de despedida. Use {nome} para mencionar o membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, args, textoArgs, db }) => {
    if (!db.getGrupo(jid)) db.registrarGrupo(jid, '');

    if (!args.length) {
      const atual = db.getGrupo(jid)?.saida_texto || '(padrão)';
      await reagir(sock, msg, '🚪');
      return responderPV(sock, autor, `🚪 Saída atual:\n${atual}`);
    }

    if (args[0] === 'reset') {
      db.setConfig(jid, 'saida_texto', '');
      await reagir(sock, msg, '✅');
      return responderPV(sock, autor, '✅ Mensagem de saída resetada para o padrão.');
    }

    db.setConfig(jid, 'saida_texto', textoArgs);
    await reagir(sock, msg, '✅');
    await responderPV(sock, autor, `✅ Mensagem de saída atualizada!\nPreview: ${textoArgs.replace('{nome}', '@voce')}`);
  },
};
