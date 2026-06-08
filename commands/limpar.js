// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'limpar', aliases: ['clear'],
  descricao: 'Apaga as últimas N mensagens (padrão 10, máx 50).',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, jid, args, buffer }) => {
    const n = Math.min(parseInt(args[0]) || 10, 50);
    const mens = buffer.pegarUltimas(jid, n);
    if (!mens.length) return sock.sendMessage(jid, { text: 'Nenhuma mensagem no buffer.' });
    let apag = 0;
    for (const m of mens) {
      try { await sock.sendMessage(jid, { delete: m.key }); apag++; await new Promise(r => setTimeout(r, 300)); } catch {}
    }
    const notif = await sock.sendMessage(jid, { text: `🗑️ *${apag}* mensagens apagadas.` }).catch(() => null);
    if (notif?.key) setTimeout(async () => { try { await sock.sendMessage(jid, { delete: notif.key }); } catch {} }, 5000);
  }
};
