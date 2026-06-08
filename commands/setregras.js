// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'setregras',
  aliases: ['setrules'],
  descricao: 'Define as regras do grupo.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, jid, args, db }) => {
    const texto = args.join(' ').trim();
    if (!texto) return sock.sendMessage(jid, { text: '⚠️ Uso: !setregras <texto das regras>' });
    db.setConfig(jid, 'regras', texto);
    await sock.sendMessage(jid, { text: '✅ Regras do grupo atualizadas!' });
  },
};