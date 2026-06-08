// Autoria Leo-Shiba GitHub
const { spawn } = require("child_process");

function iniciar() {
  const bot = spawn("node", ["--env-file=.env", "index.js"], { stdio: "inherit", cwd: __dirname });
  bot.on("close", (code) => {
    if (code === null || code === 0) return;
    console.log(`\n[launcher] Bot encerrado (código ${code}). Reiniciando em 3s...\n`);
    setTimeout(iniciar, 3000);
  });
}

iniciar();