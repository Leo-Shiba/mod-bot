// Autoria Leo-Shiba GitHub
module.exports = {
  nome: 'trancar',
  aliases: ['lock'],
  descricao: 'Tranca o grupo — só admins podem enviar mensagens.',
  apenasAdmin: true,
  apenasGrupo: true,
  botPrecisaAdmin: true,
  executar: async ({ sock, jid }) => {
    try {
      await sock.groupSettingUpdate(jid, 'announcement');
      await sock.sendMessage(jid, { text: '🔒 Grupo trancado. Apenas admins podem enviar mensagens.' });
    } catch (e) {
      await sock.sendMessage(jid, { text: '❌ Não foi possível trancar: ' + e.message });
    }
  }
};
