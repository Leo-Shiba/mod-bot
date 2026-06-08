// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero, reagir, responderPV } = require('../core/utils');

function formatarData(ts) {
  const d = new Date(ts);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm} ${hh}:${mi}`;
}

module.exports = {
  nome: 'avisos',
  aliases: ['warnings', 'warns'],
  descricao: 'Mostra os avisos de um membro (ou os seus próprios).',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, db }) => {
    const alvo = extrairMencionado(msg) || autor;
    const num = jidParaNumero(alvo);
    const g = db.getGrupo(jid);
    const lim = g?.maxavisos || 3;
    const tot = db.getAvisos(jid, alvo);

    let texto = `⚠️ @${num} tem *${tot}/${lim}* avisos.`;

    if (tot > 0) {
      const hist = db.getHistoricoAvisos(jid, alvo);
      if (hist.length > 0) {
        texto += '\n\n📋 Histórico:\n';
        texto += hist.map((h, i) => `${i + 1}. [${formatarData(h.data)}] ${h.motivo}`).join('\n');
      }
    }

    await reagir(sock, msg, '⚠️');
    await responderPV(sock, autor, texto);
  }
};
