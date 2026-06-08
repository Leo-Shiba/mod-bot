// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'avisar', aliases: ['warn'],
  descricao: 'Avisa um membro (ban automático ao limite).',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, autor, args, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '⚠️ Mencione quem avisar.');
    }
    const g = db.getGrupo(jid);
    const lim = g?.maxavisos || 3;
    const mot = args.join(' ') || 'Comportamento inadequado';
    const tot = db.addAviso(jid, alvo);
    db.addHistoricoAviso(jid, alvo, mot);
    const num = jidParaNumero(alvo);
    if (tot >= lim) {
      await reagir(sock, msg, '🚫');
      await responderPV(sock, autor, `🚫 @${num} banido (${lim}/${lim} avisos).\nMotivo: ${mot}`);
      db.resetarAvisos(jid, alvo);
      db.limparHistoricoAvisos(jid, alvo);
      try { await sock.groupParticipantsUpdate(jid, [alvo], 'remove'); } catch {}
    } else {
      await reagir(sock, msg, '⚠️');
      await responderPV(sock, autor, `⚠️ Aviso ${tot}/${lim} para @${num}.\nMotivo: ${mot}`);
    }
  }
};
