// Autoria Leo-Shiba GitHub
const { extrairMencionado, jidParaNumero } = require('../core/utils');
module.exports = {
  nome: 'rebaixar', aliases: ['demote'],
  descricao: 'Remove o admin de um membro.',
  apenasAdmin: true, apenasGrupo: true, botPrecisaAdmin: true,
  executar: async ({ sock, msg, jid }) => {
    const alvo = extrairMencionado(msg);
    if (!alvo) return sock.sendMessage(jid, { text: '❌ Mencione quem rebaixar.' });
    let meta;
    try { meta = await sock.groupMetadata(jid); } catch {
      return sock.sendMessage(jid, { text: '❌ Erro ao obter informações do grupo.' });
    }
    const alvoNum = alvo.split('@')[0].split(':')[0];
    const participante = meta.participants.find(p => p.id.split('@')[0].split(':')[0] === alvoNum);
    if (!participante) return sock.sendMessage(jid, { text: '❌ Membro não encontrado no grupo.' });
    if (!participante.admin) return sock.sendMessage(jid, { text: `❌ @${jidParaNumero(alvo)} não é admin.`, mentions: [alvo] });
    if (participante.admin === 'superadmin') return sock.sendMessage(jid, { text: '❌ Não é possível rebaixar o dono do grupo.' });
    try {
      await sock.groupParticipantsUpdate(jid, [alvo], 'demote');
      await sock.sendMessage(jid, { text: `⬇️ @${jidParaNumero(alvo)} não é mais admin.`, mentions: [alvo] });
    } catch (e) { await sock.sendMessage(jid, { text: `❌ Não foi possível rebaixar: ${e.message}` }); }
  }
};
