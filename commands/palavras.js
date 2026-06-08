// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'palavras',
  aliases: ['addpalavra', 'rmpalavra'],
  descricao: 'Gerencia palavras proibidas.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, jid, args, db, nomeCmd }) => {
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
      return sock.sendMessage(jid, {
        text: lista.length
          ? `🚫 *Palavras proibidas (${lista.length}):*\n${lista.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
          : 'ℹ️ Nenhuma palavra proibida cadastrada.',
      });
    }

    if (acao === 'add' && pal) {
      db.addPalavra(jid, pal);
      return sock.sendMessage(jid, { text: `✅ *"${pal}"* adicionada às palavras proibidas.` });
    }

    if (acao === 'rm' && pal) {
      db.removerPalavra(jid, pal);
      return sock.sendMessage(jid, { text: `✅ *"${pal}"* removida das palavras proibidas.` });
    }

    await sock.sendMessage(jid, {
      text: [
        '📋 *Uso:*',
        '!palavras — listar todas',
        '!palavras add <palavra>',
        '!palavras rm <palavra>',
        '!addpalavra <palavra>',
        '!rmpalavra <palavra>',
      ].join('\n'),
    });
  },
};