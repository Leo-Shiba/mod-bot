// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'info',
  descricao: 'Mostra informações e status do grupo.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, db }) => {
    let meta;
    try { meta = await sock.groupMetadata(jid); } catch {
      return responderPV(sock, autor, '❌ Erro ao obter informações do grupo.');
    }
    const g = db.getGrupo(jid);
    const admins = meta.participants.filter(p => p.admin).length;
    const total = meta.participants.length;
    const palavras = db.listarPalavrasProibidas(jid).length;
    const e = f => g?.[f] ? '✅' : '❌';
    await reagir(sock, msg, '📊');
    await responderPV(sock, autor, [
      `╔══════════════════════╗`,
      `     📊 *${meta.subject}*`,
      `╚══════════════════════╝`,
      '',
      `👥 Membros: *${total}* (${admins} admins)`,
      `🚫 Palavras proibidas: *${palavras}*`,
      '',
      '🔧 *Moderação*',
      `├ 🔗 AntiLink ........ ${e('antilink')}`,
      `├ 🌊 AntiFlood ....... ${e('antiflood')}`,
      `│  └ limite: *${g?.floodlimite || 5}* msgs/10s`,
      `├ 👋 Boas-vindas ..... ${e('boasvindas')}`,
      `└ 🚪 Msg de saída .... ${e('saida')}`,
      '',
      `⚠️ Max avisos p/ ban: *${g?.maxavisos || 3}*`,
    ].join('\n'));
  }
};
