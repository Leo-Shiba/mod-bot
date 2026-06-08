// Autoria Leo-Shiba GitHub
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'bot.db');

let SQL, db;

function init() {
  return require('sql.js')().then(SqlJs => {
    SQL = SqlJs;
    if (fs.existsSync(dbPath)) {
      db = new SQL.Database(fs.readFileSync(dbPath));
    } else {
      db = new SQL.Database();
    }
    db.run(`
      CREATE TABLE IF NOT EXISTS grupos (
        jid TEXT PRIMARY KEY,
        nome TEXT DEFAULT '',
        antilink INTEGER DEFAULT 0,
        antiflood INTEGER DEFAULT 0,
        boasvindas INTEGER DEFAULT 1,
        boasvindas_texto TEXT DEFAULT '',
        saida INTEGER DEFAULT 0,
        saida_texto TEXT DEFAULT '',
        regras TEXT DEFAULT '',
        maxavisos INTEGER DEFAULT 3,
        removido INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS avisos (
        jid_grupo TEXT NOT NULL,
        numero TEXT NOT NULL,
        avisos INTEGER DEFAULT 0,
        PRIMARY KEY (jid_grupo, numero)
      );
      CREATE TABLE IF NOT EXISTS palavras (
        jid_grupo TEXT NOT NULL,
        palavra TEXT NOT NULL,
        PRIMARY KEY (jid_grupo, palavra)
      );
      CREATE TABLE IF NOT EXISTS silenciados (
        jid_grupo TEXT NOT NULL,
        jid_membro TEXT NOT NULL,
        expira INTEGER NOT NULL,
        PRIMARY KEY (jid_grupo, jid_membro)
      );
      CREATE TABLE IF NOT EXISTS silencio_avisos (
        jid_grupo TEXT NOT NULL,
        jid_membro TEXT NOT NULL,
        avisos INTEGER DEFAULT 0,
        PRIMARY KEY (jid_grupo, jid_membro)
      );
      CREATE TABLE IF NOT EXISTS cmd_uso (
        chave TEXT PRIMARY KEY,
        ts INTEGER NOT NULL
      );
    `);
    try { db.run('ALTER TABLE grupos ADD COLUMN floodlimite INTEGER DEFAULT 5'); } catch {}
    save();
  });
}

function save() {
  if (!db) return;
  fs.writeFileSync(dbPath, Buffer.from(db.export()));
}

function run(sql, params = []) { db.run(sql, params); save(); }

function get(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : undefined;
  stmt.free();
  return row;
}

function all(sql, params = []) {
  const results = [];
  const stmt = db.prepare(sql);
  stmt.bind(params);
  while (stmt.step()) results.push(stmt.getAsObject());
  stmt.free();
  return results;
}

function registrarGrupo(jid, nome) {
  const existe = get('SELECT removido FROM grupos WHERE jid = ?', [jid]);
  if (existe) {
    const foiRestaurado = existe.removido === 1;
    run('UPDATE grupos SET nome = ?, removido = 0 WHERE jid = ?', [nome, jid]);
    return foiRestaurado;
  }
  run('INSERT INTO grupos (jid, nome) VALUES (?, ?)', [jid, nome]);
  return false;
}

function getGrupo(jid) { return get('SELECT * FROM grupos WHERE jid = ?', [jid]); }
function listarTodosGrupos() { return all('SELECT * FROM grupos WHERE removido = 0'); }
function setGrupoNome(jid, nome) { run('UPDATE grupos SET nome = ? WHERE jid = ?', [nome, jid]); }
function marcarRemovido(jid) { run('UPDATE grupos SET removido = 1 WHERE jid = ?', [jid]); }

const CAMPOS_VALIDOS = new Set([
  'antilink', 'antiflood', 'boasvindas', 'saida',
  'maxavisos', 'floodlimite', 'boasvindas_texto', 'saida_texto', 'regras',
]);
function setConfig(jid, campo, valor) {
  if (!CAMPOS_VALIDOS.has(campo)) throw new Error(`Campo inválido: ${campo}`);
  run(`INSERT INTO grupos (jid, ${campo}) VALUES (?, ?)
       ON CONFLICT(jid) DO UPDATE SET ${campo} = excluded.${campo}`, [jid, valor]);
}

function getAvisos(jid_grupo, numero) {
  const r = get('SELECT avisos FROM avisos WHERE jid_grupo = ? AND numero = ?', [jid_grupo, numero]);
  return r ? r.avisos : 0;
}
function addAviso(jid_grupo, numero) {
  run(`INSERT INTO avisos (jid_grupo, numero, avisos) VALUES (?, ?, 1)
       ON CONFLICT(jid_grupo, numero) DO UPDATE SET avisos = avisos + 1`, [jid_grupo, numero]);
  return getAvisos(jid_grupo, numero);
}
function resetarAvisos(jid_grupo, numero) {
  run('DELETE FROM avisos WHERE jid_grupo = ? AND numero = ?', [jid_grupo, numero]);
}

function listarPalavrasProibidas(jid_grupo) {
  return all('SELECT palavra FROM palavras WHERE jid_grupo = ?', [jid_grupo]).map(r => r.palavra);
}
function addPalavra(jid_grupo, palavra) {
  run('INSERT OR IGNORE INTO palavras (jid_grupo, palavra) VALUES (?, ?)', [jid_grupo, palavra.toLowerCase()]);
}
function removerPalavra(jid_grupo, palavra) {
  run('DELETE FROM palavras WHERE jid_grupo = ? AND palavra = ?', [jid_grupo, palavra.toLowerCase()]);
}

function addSilenciado(jid_grupo, jid_membro, minutos) {
  const expira = Date.now() + minutos * 60 * 1000;
  run(`INSERT OR REPLACE INTO silenciados (jid_grupo, jid_membro, expira) VALUES (?, ?, ?)`,
    [jid_grupo, jid_membro, expira]);
}
function getSilenciado(jid_grupo, jid_membro) {
  const r = get('SELECT expira FROM silenciados WHERE jid_grupo = ? AND jid_membro = ? AND expira > ?',
    [jid_grupo, jid_membro, Date.now()]);
  return r ? r.expira : null;
}
function removerSilenciado(jid_grupo, jid_membro) {
  run('DELETE FROM silenciados WHERE jid_grupo = ? AND jid_membro = ?', [jid_grupo, jid_membro]);
}
function getsilenciadosExpirados() {
  return all('SELECT * FROM silenciados WHERE expira <= ?', [Date.now()]);
}

function addSilencioAviso(jid_grupo, jid_membro) {
  run(`INSERT INTO silencio_avisos (jid_grupo, jid_membro, avisos) VALUES (?, ?, 1)
       ON CONFLICT(jid_grupo, jid_membro) DO UPDATE SET avisos = avisos + 1`, [jid_grupo, jid_membro]);
  return getSilencioAvisos(jid_grupo, jid_membro);
}
function getSilencioAvisos(jid_grupo, jid_membro) {
  const r = get('SELECT avisos FROM silencio_avisos WHERE jid_grupo = ? AND jid_membro = ?', [jid_grupo, jid_membro]);
  return r ? r.avisos : 0;
}
function resetarSilencioAvisos(jid_grupo, jid_membro) {
  run('DELETE FROM silencio_avisos WHERE jid_grupo = ? AND jid_membro = ?', [jid_grupo, jid_membro]);
}

// ── Cmd uso (rate limit) ──────────────────────────────────────────────────────
function podaAvisarDb(chave, intervaloMs) {
  const agora = Date.now();
  const r = get('SELECT ts FROM cmd_uso WHERE chave = ?', [chave]);
  if (r && agora - r.ts < intervaloMs) return false;
  run('INSERT OR REPLACE INTO cmd_uso (chave, ts) VALUES (?, ?)', [chave, agora]);
  return true;
}

module.exports = {
  init, save,
  registrarGrupo, getGrupo, listarTodosGrupos, setGrupoNome, marcarRemovido, setConfig,
  getAvisos, addAviso, resetarAvisos,
  listarPalavrasProibidas, addPalavra, removerPalavra,
  addSilenciado, getSilenciado, removerSilenciado, getsilenciadosExpirados,
  addSilencioAviso, getSilencioAvisos, resetarSilencioAvisos,
  podaAvisarDb,
};
