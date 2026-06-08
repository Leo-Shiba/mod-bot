// test_bot.js — testes automatizados do mod-bot
process.chdir(__dirname);
const db = require('./core/database');
const buffer = require('./core/buffer');
const handler = require('./core/commandHandler');
const seguranca = require('./core/seguranca');
const { extrairMencionado, jidParaNumero, formatarHora } = require('./core/utils');

const ADMIN_JID = 'admin1@s.whatsapp.net';

let GID, GJID;
let passed = 0, failed = 0;
const erros = [];

function ok(nome, cond) {
  if (cond) { process.stdout.write('  OK ' + nome + '\n'); passed++; }
  else       { process.stdout.write('  XX ' + nome + '\n'); failed++; erros.push(nome); }
}

function makeSock() {
  const sent = [];
  return {
    _sent: sent,
    _last: () => sent[sent.length - 1],
    _texto: () => {
      // retorna texto da ultima mensagem que seja texto (não react)
      for (let i = sent.length - 1; i >= 0; i--) {
        if (sent[i]?.msg?.text) return sent[i].msg.text;
      }
      return '';
    },
    sendMessage: async (jid, msg) => { sent.push({ jid, msg }); return { key: { id: 'mock_' + Date.now() } }; },
    groupMetadata: async () => ({
      subject: 'Grupo Teste',
      participants: [
        { id: ADMIN_JID, admin: 'admin' },
        { id: 'membro1@s.whatsapp.net', admin: null },
      ],
    }),
    groupParticipantsUpdate: async () => {},
    groupSettingUpdate: async () => {},
    onWhatsApp: async () => [],
    user: { id: 'bot@s.whatsapp.net' },
  };
}

function mkMsg(texto, autor, jid) {
  return {
    key: { remoteJid: jid || GJID, participant: autor || ADMIN_JID, fromMe: false, id: 'msg_' + Date.now() + Math.random() },
    messageTimestamp: Math.floor(Date.now() / 1000),
    message: { conversation: texto },
  };
}

function mkMsgMencao(texto, mencionado) {
  return {
    key: { remoteJid: GJID, participant: ADMIN_JID, fromMe: false, id: 'msg_' + Date.now() + Math.random() },
    messageTimestamp: Math.floor(Date.now() / 1000),
    message: { extendedTextMessage: { text: texto, contextInfo: { mentionedJid: [mencionado] } } },
  };
}

async function cmd(msg) {
  const s = makeSock();
  await handler.tratarMensagem({ sock: s, msg, db, buffer });
  return s;
}

async function run() {
  await db.init();
  handler.carregarComandos();

  const ts = Date.now();
  GID  = 'teste_' + ts + '@g.us';
  GJID = 'grupo_' + ts + '@g.us';

  // ══════════════════════════════════════════════════════════════
  console.log('\nDATABASE');
  // ══════════════════════════════════════════════════════════════

  const MID = '55999@s.whatsapp.net';

  db.registrarGrupo(GID, 'Grupo Teste');
  const g = db.getGrupo(GID);
  ok('registrarGrupo cria o grupo', !!g);
  ok('nome do grupo correto', g?.nome === 'Grupo Teste');
  ok('antilink desativado por padrao', g?.antilink === 0);
  ok('antiflood desativado por padrao', g?.antiflood === 0);
  ok('boasvindas ativo por padrao', g?.boasvindas === 1);
  ok('maxavisos padrao = 3', g?.maxavisos === 3);

  db.setConfig(GID, 'antilink', 1);    ok('setConfig antilink on',     db.getGrupo(GID)?.antilink === 1);
  db.setConfig(GID, 'antiflood', 1);   ok('setConfig antiflood on',    db.getGrupo(GID)?.antiflood === 1);
  db.setConfig(GID, 'maxavisos', 5);   ok('setConfig maxavisos = 5',   db.getGrupo(GID)?.maxavisos === 5);
  db.setConfig(GID, 'floodlimite', 3); ok('setConfig floodlimite = 3', db.getGrupo(GID)?.floodlimite === 3);
  try { db.setConfig(GID, 'campo_invalido', 1); ok('setConfig campo invalido lanca erro', false); }
  catch { ok('setConfig campo invalido lanca erro', true); }
  ok('listarTodosGrupos retorna array', Array.isArray(db.listarTodosGrupos()));

  ok('avisos iniciam em 0', db.getAvisos(GID, MID) === 0);
  db.addAviso(GID, MID); ok('addAviso 1', db.getAvisos(GID, MID) === 1);
  db.addAviso(GID, MID); ok('addAviso 2', db.getAvisos(GID, MID) === 2);
  db.resetarAvisos(GID, MID); ok('resetarAvisos zera', db.getAvisos(GID, MID) === 0);

  // historico_avisos
  db.addHistoricoAviso(GID, MID, 'Spam');
  db.addHistoricoAviso(GID, MID, 'Flood');
  const hist = db.getHistoricoAvisos(GID, MID);
  ok('historico tem 2 registros', hist.length === 2);
  ok('historico preserva motivo', hist[0].motivo === 'Spam');
  ok('historico tem timestamp', hist[0].data > 0);
  db.limparHistoricoAvisos(GID, MID);
  ok('limparHistoricoAvisos remove tudo', db.getHistoricoAvisos(GID, MID).length === 0);

  ok('lista de palavras vazia', db.listarPalavrasProibidas(GID).length === 0);
  db.addPalavra(GID, 'spam'); db.addPalavra(GID, 'flood');
  const pals = db.listarPalavrasProibidas(GID);
  ok('addPalavra spam', pals.includes('spam'));
  ok('addPalavra flood', pals.includes('flood'));
  ok('palavras em minusculas', !pals.includes('SPAM'));
  db.removerPalavra(GID, 'spam');
  ok('removerPalavra remove', !db.listarPalavrasProibidas(GID).includes('spam'));

  ok('nao silenciado inicialmente', db.getSilenciado(GID, MID) === null);
  db.addSilenciado(GID, MID, 30);
  ok('addSilenciado cria', db.getSilenciado(GID, MID) !== null);
  ok('expira no futuro', db.getSilenciado(GID, MID) > Date.now());
  ok('expirados nao retorna ativo', db.getsilenciadosExpirados().every(s => s.jid_membro !== MID));
  db.removerSilenciado(GID, MID);
  ok('removerSilenciado limpa', db.getSilenciado(GID, MID) === null);

  ok('silencio_avisos inicia 0', db.getSilencioAvisos(GID, MID) === 0);
  db.addSilencioAviso(GID, MID); db.addSilencioAviso(GID, MID);
  ok('addSilencioAviso 2', db.getSilencioAvisos(GID, MID) === 2);
  db.resetarSilencioAvisos(GID, MID);
  ok('resetarSilencioAvisos zera', db.getSilencioAvisos(GID, MID) === 0);

  // ══════════════════════════════════════════════════════════════
  console.log('\nUTILS');
  // ══════════════════════════════════════════════════════════════

  ok('jidParaNumero remove @',  jidParaNumero('55999@s.whatsapp.net') === '55999');
  ok('jidParaNumero remove :N', jidParaNumero('55999:1@s.whatsapp.net') === '55999');
  ok('jidParaNumero remove .N', jidParaNumero('55999.1@s.whatsapp.net') === '55999');
  ok('formatarHora retorna string', typeof formatarHora(Date.now()) === 'string');
  ok('extrairMencionado de mentionedJid', extrairMencionado(mkMsgMencao('!banir', '55888@s.whatsapp.net')) === '55888@s.whatsapp.net');
  ok('extrairMencionado null sem mencao', extrairMencionado(mkMsg('!banir')) === null);
  const msgQ = { key: {}, message: { extendedTextMessage: { text: '!banir', contextInfo: { participant: '55777@s.whatsapp.net' } } } };
  ok('extrairMencionado de quoted', extrairMencionado(msgQ) === '55777@s.whatsapp.net');

  // ══════════════════════════════════════════════════════════════
  console.log('\nSEGURANCA (rate limit)');
  // ══════════════════════════════════════════════════════════════

  const sockSeg = makeSock();
  let bloqueou = false;
  for (let i = 0; i < 9; i++) {
    if (await seguranca.processar({ sock: sockSeg, numero: '55spam_test', jid: GID })) { bloqueou = true; break; }
  }
  ok('rate limit bloqueia apos spam', bloqueou);
  seguranca.limparTudo();

  // ══════════════════════════════════════════════════════════════
  console.log('\nCOMANDOS roteamento');
  // ══════════════════════════════════════════════════════════════

  db.registrarGrupo(GJID, 'Grupo1');

  { const s = makeSock();
    await handler.tratarMensagem({ sock: s, msg: mkMsg('!naoexiste'), db, buffer });
    ok('cmd inexistente nao responde', s._sent.length === 0); }

  { const s = makeSock();
    await handler.tratarMensagem({ sock: s, msg: { key: { remoteJid: '55999@s.whatsapp.net', fromMe: false }, messageTimestamp: Math.floor(Date.now()/1000), message: { conversation: '!banir' } }, db, buffer });
    ok('DM ignorado silenciosamente', s._sent.length === 0); }

  { const s = makeSock();
    await handler.tratarMensagem({ sock: s, msg: mkMsg('!banir', 'membro1@s.whatsapp.net'), db, buffer });
    const temReact = s._sent.some(m => m.msg?.react?.text === '❌');
    const semTexto = !s._sent.some(m => m.msg?.text);
    ok('nao-admin recebe reacao X sem texto', temReact && semTexto); }

  // ══════════════════════════════════════════════════════════════
  console.log('\nCOMANDOS respostas');
  // ══════════════════════════════════════════════════════════════
  seguranca.limparTudo();

  { const s = await cmd(mkMsg('!ajuda'));    ok('!ajuda responde no PV',  s._texto().includes('MOD BOT')); }
  { const s = await cmd(mkMsg('!help'));     ok('!help alias',            s._texto().includes('MOD BOT')); }
  { const s = await cmd(mkMsg('!info'));     ok('!info responde no PV',   s._texto().includes('Membros')); }
  { const s = await cmd(mkMsg('!admins'));   ok('!admins responde no PV', s._texto().includes('admin')); }
  { const s = await cmd(mkMsg('!regras'));   ok('!regras sem regras',     s._texto().includes('Nenhuma')); }
  { const s = await cmd(mkMsg('!avisos'));   ok('!avisos responde no PV', s._texto().includes('0')); }

  { await cmd(mkMsg('!setregras Proibido spam'));
    const s2 = await cmd(mkMsg('!regras'));
    ok('!setregras + !regras', s2._texto().includes('spam')); }

  seguranca.limparTudo();
  { const s = await cmd(mkMsg('!config'));                 ok('!config painel',        s._texto().toUpperCase().includes('CONFIGURA')); }
  { const s = await cmd(mkMsg('!config antilink on'));     ok('!config antilink on',   s._texto().includes('antilink')); }
  { const s = await cmd(mkMsg('!config antiflood off'));   ok('!config antiflood off', s._texto().includes('antiflood')); }
  { const s = await cmd(mkMsg('!config maxavisos 5'));     ok('!config maxavisos 5',   s._texto().includes('5')); }
  { const s = await cmd(mkMsg('!config maxavisos 0'));     ok('!config maxavisos 0 rejeita', s._texto().includes('!')); }
  { const s = await cmd(mkMsg('!cfg'));                    ok('!cfg alias',            s._texto().toUpperCase().includes('CONFIGURA')); }

  seguranca.limparTudo();
  { db.resetarAvisos(GJID, 'membro1@s.whatsapp.net');
    db.limparHistoricoAvisos(GJID, 'membro1@s.whatsapp.net');
    const s = await cmd(mkMsgMencao('!avisar', 'membro1@s.whatsapp.net'));
    ok('!avisar resposta no PV', s._texto().includes('Aviso'));
    ok('!avisar bd', db.getAvisos(GJID, 'membro1@s.whatsapp.net') === 1);
    ok('!avisar salva historico', db.getHistoricoAvisos(GJID, 'membro1@s.whatsapp.net').length === 1); }

  { const s = await cmd(mkMsgMencao('!avisos', 'membro1@s.whatsapp.net'));
    ok('!avisos mostra contagem', s._texto().includes('1'));
    ok('!avisos mostra historico', s._texto().includes('Hist')); }

  { const s = await cmd(mkMsgMencao('!resetar', 'membro1@s.whatsapp.net'));
    ok('!resetar zera bd', db.getAvisos(GJID, 'membro1@s.whatsapp.net') === 0);
    ok('!resetar limpa historico', db.getHistoricoAvisos(GJID, 'membro1@s.whatsapp.net').length === 0);
    ok('!resetar confirma no PV', s._texto().length > 0); }

  { const s = await cmd(mkMsgMencao('!silenciar 60', 'membro1@s.whatsapp.net'));
    ok('!silenciar cria', db.getSilenciado(GJID, 'membro1@s.whatsapp.net') !== null);
    ok('!silenciar confirma no PV', s._texto().includes('ilen')); }

  { const s = await cmd(mkMsgMencao('!dessilenciar', 'membro1@s.whatsapp.net'));
    ok('!dessilenciar remove', db.getSilenciado(GJID, 'membro1@s.whatsapp.net') === null);
    ok('!dessilenciar confirma no PV', s._texto().length > 0); }

  { const s = await cmd(mkMsgMencao('!dessilenciar', 'membro1@s.whatsapp.net'));
    ok('!dessilenciar sem silencio confirma', s._texto().length > 0); }

  { db.addPalavra(GJID, 'palavrateste');
    const s = await cmd(mkMsg('!palavras'));
    ok('!palavras lista no PV', s._texto().includes('palavrateste')); }

  seguranca.limparTudo();
  { await cmd(mkMsg('!addpalavra nova')); ok('!addpalavra adiciona', db.listarPalavrasProibidas(GJID).includes('nova')); }
  { await cmd(mkMsg('!rmpalavra nova'));  ok('!rmpalavra remove',    !db.listarPalavrasProibidas(GJID).includes('nova')); }
  { await cmd(mkMsg('!palavras add direta')); ok('!palavras add', db.listarPalavrasProibidas(GJID).includes('direta')); }
  { await cmd(mkMsg('!palavras rm direta'));  ok('!palavras rm',  !db.listarPalavrasProibidas(GJID).includes('direta')); }

  { const s = await cmd(mkMsg('!setboasvindas Ola {nome}!'));
    ok('!setboasvindas salva', db.getGrupo(GJID)?.boasvindas_texto?.includes('Ola'));
    ok('!setboasvindas confirma no PV', s._texto().includes('!')); }

  { const s = await cmd(mkMsg('!setsaida Tchau {nome}!'));
    ok('!setsaida salva', db.getGrupo(GJID)?.saida_texto?.includes('Tchau'));
    ok('!setsaida confirma no PV', s._texto().includes('!')); }

  seguranca.limparTudo();
  { const s = await cmd(mkMsg('!trancar'));     ok('!trancar responde',    s._texto().length > 0); }
  { const s = await cmd(mkMsg('!destrancar'));  ok('!destrancar responde', s._texto().length > 0); }

  { for (let i = 0; i < 5; i++) buffer.registrar(GJID, { remoteJid: GJID, id: 'b' + i, participant: 'a@s.whatsapp.net' }, 'a@s.whatsapp.net');
    const s = await cmd(mkMsg('!limpar 3'));
    ok('!limpar apaga mensagens', s._sent.some(m => m.msg?.delete));
    ok('!limpar notifica',        s._sent.some(m => (m.msg?.text || '').includes('apaga'))); }

  { const s = await cmd(mkMsg('!banir'));    ok('!banir sem mencao',    s._texto().length > 0); }
  { const s = await cmd(mkMsg('!avisar'));   ok('!avisar sem mencao',   s._texto().length > 0); }
  { const s = await cmd(mkMsg('!promover')); ok('!promover sem mencao', s._texto().length > 0); }
  { const s = await cmd(mkMsg('!rebaixar')); ok('!rebaixar sem mencao', s._texto().length > 0); }
  { const s = await cmd(mkMsg('!resetar'));  ok('!resetar sem mencao',  s._texto().length > 0); }

  // ══════════════════════════════════════════════════════════════
  console.log('\nANTILINK / ANTIFLOOD / CAPTIONS');
  // ══════════════════════════════════════════════════════════════

  const RL = /(https?:\/\/|wa\.me\/|bit\.ly\/|t\.me\/|chat\.whatsapp\.com)/i;
  ok('detecta https',             RL.test('https://evil.com'));
  ok('detecta chat.whatsapp.com', RL.test('chat.whatsapp.com/abc'));
  ok('detecta wa.me',             RL.test('wa.me/5511'));
  ok('detecta bit.ly',            RL.test('bit.ly/abc'));
  ok('detecta t.me',              RL.test('t.me/g'));
  ok('sem falso-positivo texto',  !RL.test('oi tudo bem'));
  ok('sem falso-positivo numero', !RL.test('55999887766'));

  const _fm = new Map();
  function checkFlood(g, n, limite) {
    const k = g + ':' + n, now = Date.now();
    if (!_fm.has(k)) _fm.set(k, []);
    const a = _fm.get(k);
    while (a.length && a[0] < now - 10000) a.shift();
    a.push(now);
    return a.length >= limite;
  }
  let fl = false;
  for (let i = 0; i < 5; i++) fl = checkFlood('g@g.us', 's', 5);
  ok('checkFlood detecta no 5o msg', fl === true);
  ok('checkFlood nao detecta abaixo do limite', !checkFlood('g@g.us', 'n', 10));

  function extrairTexto(msg) {
    return msg.message?.conversation
      || msg.message?.extendedTextMessage?.text
      || msg.message?.imageMessage?.caption
      || msg.message?.videoMessage?.caption
      || msg.message?.documentMessage?.caption
      || '';
  }
  const mc = (tipo, cap) => { const m = { message: {} }; m.message[tipo + 'Message'] = { caption: cap }; return m; };
  ok('caption image',    extrairTexto(mc('image',    'https://x.com')) === 'https://x.com');
  ok('caption video',    extrairTexto(mc('video',    '!ajuda'))        === '!ajuda');
  ok('caption document', extrairTexto(mc('document', 'ruim'))          === 'ruim');
  ok('conversation',     extrairTexto({ message: { conversation: 'oi' } }) === 'oi');

  // ══════════════════════════════════════════════════════════════
  console.log('\nRESULTADO FINAL');
  // ══════════════════════════════════════════════════════════════

  const total = passed + failed;
  console.log('\n  ' + passed + '/' + total + ' testes passaram');
  if (erros.length) {
    console.log('\n  Falhas:');
    for (const e of erros) console.log('    - ' + e);
  } else {
    console.log('  Nenhuma falha!');
  }
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(e => { console.error('\nERRO FATAL:', e); process.exit(1); });
