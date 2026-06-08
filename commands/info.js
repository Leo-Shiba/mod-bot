// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'info',
  descricao: 'Mostra informações e status do grupo.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, jid, db }) => {
    let meta;
    try { meta = await sock.groupMetadata(jid); } catch {
      return sock.sendMessage(jid, { text: '❌ Erro ao obter informações do grupo.' });
    }
    const g = db.getGrupo(jid);
    const admins = meta.participants.filter(p => p.admin).length;
    const total = meta.participants.length;
    const palavras = db.listarPalavrasProibidas(jid).length;
    const e = f => g?.[f] ? '✅' : '❌';
    await sock.sendMessage(jid, {
      text: [
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
      ].join('\n')
    });
  }
};
