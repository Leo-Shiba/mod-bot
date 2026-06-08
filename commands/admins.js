// Autoria Leo-Shiba GitHub
const { jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'admins',
  descricao: 'Lista os admins do grupo.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor }) => {
    let meta;
    try { meta = await sock.groupMetadata(jid); } catch {
      return responderPV(sock, autor, '❌ Erro ao obter lista de admins.');
    }
    const admins = meta.participants.filter(p => p.admin);
    await reagir(sock, msg, '👑');
    if (!admins.length) return responderPV(sock, autor, 'Sem admins no grupo.');
    await responderPV(sock, autor,
      `👑 *Admins (${admins.length}):*\n${admins.map(a => `• @${jidParaNumero(a.id)}${a.admin === 'superadmin' ? ' 👑' : ''}`).join('\n')}`
    );
  }
};
