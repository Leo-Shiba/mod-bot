// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'palavras',
  aliases: ['addpalavra', 'rmpalavra', 'words', 'addword', 'rmword'],
  descricao: 'Gerencia palavras proibidas.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, args, db, nomeCmd }) => {
    let acao, palavraArgs;

    if (nomeCmd === 'addpalavra') {
      acao = 'add';
      palavraArgs = args;
    } else if (nomeCmd === 'rmpalavra') {
      acao = 'rm';
      palavraArgs = args;
    } else {
      [acao, ...palavraArgs] = args;
    }

    const pal = (palavraArgs || []).join(' ').toLowerCase().trim();

    if (!acao) {
      const lista = db.listarPalavrasProibidas(jid);
      await reagir(sock, msg, '✅');
      return responderPV(sock, autor,
        lista.length
          ? `🚫 *Palavras proibidas (${lista.length}):*\n${lista.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
          : 'ℹ️ Nenhuma palavra proibida cadastrada.'
      );
    }

    if (acao === 'add' && pal) {
      db.addPalavra(jid, pal);
      await reagir(sock, msg, '✅');
      return responderPV(sock, autor, `✅ *"${pal}"* adicionada às palavras proibidas.`);
    }

    if (acao === 'rm' && pal) {
      db.removerPalavra(jid, pal);
      await reagir(sock, msg, '✅');
      return responderPV(sock, autor, `✅ *"${pal}"* removida das palavras proibidas.`);
    }

    await reagir(sock, msg, '❓');
    await responderPV(sock, autor, [
      '📋 *Uso:*',
      '!palavras — listar todas',
      '!palavras add <palavra>',
      '!palavras rm <palavra>',
      '!addpalavra <palavra>',
      '!rmpalavra <palavra>',
    ].join('\n'));
  },
};
