// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero } = require('../core/utils');
module.exports = {
  nome: 'avisos',
  descricao: 'Mostra os avisos de um membro (ou os seus próprios).',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, db }) => {
    const alvo = extrairMencionado(msg) || autor;
    const num = jidParaNumero(alvo);
    const g = db.getGrupo(jid);
    const lim = g?.maxavisos || 3;
    const tot = db.getAvisos(jid, alvo);
    await sock.sendMessage(jid, {
      text: `⚠️ @${num} tem *${tot}/${lim}* avisos.`,
      mentions: [alvo]
    });
  }
};
