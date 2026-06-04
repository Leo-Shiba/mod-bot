// Autoria Leo-Shiba GitHub
const { spawn } = require('child_process');
const path = require('path');

function iniciar() {
  const bot = spawn('node', ['index.js'], { stdio: 'inherit', cwd: __dirname });

  bot.on('close', (code) => {
    if (code === 99) {
      console.log('\n[launcher] Reiniciando bot após atualização de código...\n');
      setTimeout(iniciar, 1500);
    } else {
      console.log(`[launcher] Bot encerrado (código ${code}). Pressione Ctrl+C para sair.`);
    }
  });
}

iniciar();
