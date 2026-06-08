// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'regras',
  aliases: ['rules'],
  descricao: 'Mostra as regras do grupo.',
  apenasAdmin: false,
  apenasGrupo: true,
  executar: async ({ sock, jid, db }) => {
    const g = db.getGrupo(jid);
    if (!g?.regras) return sock.sendMessage(jid, { text: 'ℹ️ Nenhuma regra definida. Peça ao admin para usar !setregras.' });
    await sock.sendMessage(jid, { text: `📜 *Regras do Grupo:*\n\n${g.regras}` });
  }
};
