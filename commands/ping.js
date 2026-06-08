// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'ping',
  descricao: 'Verifica se o bot está online.',
  apenasAdmin: true,
  executar: async ({ sock, jid, msg }) => {
    const inicio = msg.messageTimestamp * 1000;
    const latencia = Date.now() - inicio;
    await sock.sendMessage(jid, { text: `🏓 Pong! ${latencia}ms` });
  },
};
