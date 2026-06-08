// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'destrancar',
  aliases: ['unlock'],
  descricao: 'Destranca o grupo — todos podem enviar mensagens.',
  apenasAdmin: true,
  apenasGrupo: true,
  botPrecisaAdmin: true,
  executar: async ({ sock, jid }) => {
    try {
      await sock.groupSettingUpdate(jid, 'not_announcement');
      await sock.sendMessage(jid, { text: '🔓 Grupo destrancado. Todos podem enviar mensagens.' });
    } catch (e) {
      await sock.sendMessage(jid, { text: '❌ Não foi possível destrancar: ' + e.message });
    }
  }
};
