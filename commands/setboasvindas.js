// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'setboasvindas',
  descricao: 'Define a mensagem de boas-vindas. Use {nome} para mencionar o membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, jid, args, db }) => {
    if (!db.getGrupo(jid)) db.registrarGrupo(jid, '');

    if (!args.length) {
      const atual = db.getGrupo(jid)?.boasvindas_texto || '(padrão)';
      return sock.sendMessage(jid, { text: `👋 Boas-vindas atual:\n${atual}` });
    }

    if (args[0] === 'reset') {
      db.setConfig(jid, 'boasvindas_texto', '');
      return sock.sendMessage(jid, { text: '✅ Mensagem de boas-vindas resetada para o padrão.' });
    }

    const novaMsg = args.join(' ');
    db.setConfig(jid, 'boasvindas_texto', novaMsg);
    await sock.sendMessage(jid, {
      text: `✅ Boas-vindas atualizada!\nPreview: ${novaMsg.replace('{nome}', '@voce')}`,
    });
  },
};