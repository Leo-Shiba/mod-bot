// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero } = require('../core/utils');
module.exports = {
  nome: 'avisar', aliases: ['warn'],
  descricao: 'Avisa um membro (ban automático ao limite).',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, args, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) return sock.sendMessage(jid, { text: '⚠️ Mencione quem avisar.' });
    const g = db.getGrupo(jid);
    const lim = g?.maxavisos || 3;
    const mot = args.join(' ') || 'Comportamento inadequado';
    const tot = db.addAviso(jid, alvo);
    const num = jidParaNumero(alvo);
    if (tot >= lim) {
      await sock.sendMessage(jid, { text: `🚫 @${num} banido (${lim} avisos). Motivo: ${mot}`, mentions: [alvo] });
      db.resetarAvisos(jid, alvo);
      try { await sock.groupParticipantsUpdate(jid, [alvo], 'remove'); } catch {}
    } else {
      await sock.sendMessage(jid, { text: `⚠️ Aviso ${tot}/${lim} para @${num}. Motivo: ${mot}`, mentions: [alvo] });
    }
  }
};
