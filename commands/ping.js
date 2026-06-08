// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'ping',
  descricao: 'Verifica se o bot está online.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, autor }) => {
    const latencia = Date.now() - msg.messageTimestamp * 1000;
    await reagir(sock, msg, '🏓');
    await responderPV(sock, autor, `🏓 Pong! *${latencia}ms*`);
  },
};
