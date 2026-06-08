// Autoria Leo-Shiba GitHub
const { reagir, responderPV } = require('../core/utils');

function normalizar(str) {
  return (str || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

module.exports = {
  nome: 'config',
  aliases: ['set', 'cfg'],
  descricao: 'Mostra ou altera as configurações do grupo.',
  apenasAdmin: true,
  apenasGrupo: true,
  executar: async ({ sock, msg, jid, autor, args, db }) => {
    const campo = normalizar(args[0]);
    const valor = (args[1] || '').toLowerCase();
    const toggles = ['antilink', 'antiflood', 'boasvindas', 'saida', 'antistatus'];
    const numericos = {
      maxavisos:   { min: 1, label: 'Max avisos' },
      floodlimite: { min: 2, label: 'Flood limite' },
    };

    if (!campo) {
      const g = db.getGrupo(jid);
      const e = f => g?.[f] ? '✅' : '❌';
      await reagir(sock, msg, '⚙️');
      return responderPV(sock, autor, [
        '╔══════════════════════╗',
        '      ⚙️ *CONFIGURAÇÕES*',
        '╚══════════════════════╝',
        '',
        `🔗 AntiLink ......... ${e('antilink')}`,
        `🌊 AntiFlood ........ ${e('antiflood')}`,
        `👋 Boas-vindas ...... ${e('boasvindas')}`,
        `🚪 Msg de saída ..... ${e('saida')}`,
        `📸 Anti-status ...... ${e('antistatus')}`,
        '',
        '📊 *Limites*',
        `├ ⚠️ Max avisos: *${g?.maxavisos || 3}*`,
        `└ 🌊 Flood: *${g?.floodlimite || 5}* msgs/10s`,
        '',
        '📝 *Como alterar:*',
        '!config antilink on/off',
        '!config antiflood on/off',
        '!config boasvindas on/off',
        '!config saida on/off',
        '!config antistatus on/off',
        '!config maxavisos <n>',
        '!config floodlimite <n>',
      ].join('\n'));
    }

    if (numericos[campo]) {
      const n = parseInt(valor);
      if (isNaN(n) || n < numericos[campo].min) {
        await reagir(sock, msg, '❌');
        return responderPV(sock, autor, `❌ Uso: !config ${campo} <número mínimo: ${numericos[campo].min}>`);
      }
      db.setConfig(jid, campo, n);
      await reagir(sock, msg, '✅');
      return responderPV(sock, autor, `✅ *${numericos[campo].label}* atualizado para *${n}*`);
    }

    if (!toggles.includes(campo) || !['on', 'off'].includes(valor)) {
      await reagir(sock, msg, '❌');
      return responderPV(sock, autor, '❌ Campo inválido.\n\nCampos: antilink, antiflood, boasvindas, saida, antistatus\nUso: !config <campo> on/off');
    }

    if (!db.getGrupo(jid)) db.registrarGrupo(jid, '');
    db.setConfig(jid, campo, valor === 'on' ? 1 : 0);
    const ativo = valor === 'on';
    await reagir(sock, msg, ativo ? '✅' : '🔴');
    await responderPV(sock, autor, `${ativo ? '✅' : '🔴'} *${campo}* ${ativo ? 'ativado' : 'desativado'}.`);
  }
};
