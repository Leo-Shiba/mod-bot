// Autoria Leo-Shiba GitHub
module.exports = {
  prefixo: '!',
  dbPath: './data/bot.db',
  donos: (process.env.DONOS || '').split(',').map(n => n.trim()).filter(Boolean),
};
