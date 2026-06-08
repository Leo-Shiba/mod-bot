// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'setsaida',
  descricao: 'Define a mensagem de despedida. Use {nome} para mencionar o membro.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, jid, args, db }) => {
    if (!db.getGrupo(jid)) db.registrarGrupo(jid, '');

    if (!args.length) {
      const atual = db.getGrupo(jid)?.saida_texto || '(padrão)';
      return sock.sendMessage(jid, { text: `🚪 Saída atual:\n${atual}` });
    }

    if (args[0] === 'reset') {
      db.setConfig(jid, 'saida_texto', '');
      return sock.sendMessage(jid, { text: '✅ Mensagem de saída resetada para o padrão.' });
    }

    const novaMsg = args.join(' ');
    db.setConfig(jid, 'saida_texto', novaMsg);
    await sock.sendMessage(jid, {
      text: `✅ Mensagem de saída atualizada!\nPreview: ${novaMsg.replace('{nome}', '@voce')}`,
    });
  },
};