// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');
module.exports = {
  nome: 'silenciar', aliases: ['mute'],
  descricao: 'Silencia por X min (padrão 30). Apaga msgs e expulsa após avisos.',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid, autor, args, db }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Mencione quem silenciar.');
    }
    const min = Math.min(parseInt(args.find(a => /^\d+$/.test(a))) || 30, 1440);
    const num = jidParaNumero(alvo);
    const g = db.getGrupo(jid);
    const maxAvisos = g?.maxavisos || 3;
    db.addSilenciado(jid, alvo, min);
    db.resetarSilencioAvisos(jid, alvo);
    const horas = min >= 60 ? `${(min / 60).toFixed(1)}h` : `${min}min`;
    await reagir(sock, msg, '🔇');
    await responderPV(sock, autor, [
      `🔇 *@${num} silenciado por ${horas}*`,
      '',
      `Mensagens serão apagadas automaticamente.`,
      `Após *${maxAvisos} mensagens* enviadas, será expulso.`,
      '',
      `Para dessilenciar: *!dessilenciar @${num}*`,
    ].join('\n'));
  }
};
