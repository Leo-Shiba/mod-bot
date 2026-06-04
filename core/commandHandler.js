// Autoria Leo-Shiba GitHub
const fs = require('fs');
const path = require('path');
const config = require('../config');
const seguranca = require('./seguranca');
const { ehDono } = require('./notificar');
const comandos = new Map();
const _adminCache = new Map();
const ADMB_TTL = 60_000;
function invalidarCacheAdmin(j) { _adminCache.delete(j); }
function carregarComandos() {
  comandos.clear();
  const dir = path.join(__dirname, '..', 'commands');
  for (const arquivo of fs.readdirSync(dir)) {
    if (!arquivo.endsWith('.js') || arquivo.startsWith('_')) continue;
    delete require.cache[require.resolve(path.join(dir, arquivo))];
    const cmd = require(path.join(dir, arquivo));
    if (!cmd?.nome || typeof cmd.executar !== 'function') continue;
    comandos.set(cmd.nome.toLowerCase(), cmd);
    for (const alias of cmd.aliases || []) comandos.set(alias.toLowerCase(), cmd);
  }
}
function listar() { return [...new Set(comandos.values())]; }
async function tratarMensagem({ sock, msg, db, buffer }) {
  const jid = msg.key.remoteJid;
  const texto = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
  if (!texto.startsWith(config.prefixo)) return;
  const partes = texto.slice(config.prefixo.length).trim().split(/\s+/);
  const nome = partes.shift()?.toLowerCase();
  const args = partes;
  const cmd = comandos.get(nome);
  const autor = msg.key.participant || msg.key.remoteJid;
  if (!cmd) return;
  let temPermissao = true;
  if (cmd.apenasAdmin) {
    const meta = await sock.groupMetadata(jid).catch(()=>null);
    const admins = meta?.participants.filter(p=>p.admin).map(p=>p.id) || [];
    temPermissao = admins.includes(autor) || ehDono(autor.split('@')[0]);
  }
  const bloq = await seguranca.processar({ sock, numero: autor.split('@')[0], nomeCmd: nome, temPermissao, jid });
  if (bloq) return;
  if (!temPermissao) { await sock.sendMessage(jid, { text: 'Só para admins.' }); return; }
  try {
    await cmd.executar({ sock, msg, jid, autor, args, db, buffer, comandos: listar });
  } catch (err) { await sock.sendMessage(jid, { text: 'Erro: ' + err.message }); }
}
module.exports = { carregarComandos, tratarMensagem, listar, invalidarCacheAdmin };
