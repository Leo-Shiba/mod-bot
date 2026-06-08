// Autoria Leo-Shiba GitHub
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const lockFile = path.join(__dirname, "data/bot.pid");

// Verifica se ja existe uma instancia rodando
if (fs.existsSync(lockFile)) {
  const pid = parseInt(fs.readFileSync(lockFile, "utf8").trim());
  try {
    process.kill(pid, 0);
    console.log(`[launcher] Instancia ja rodando (PID ${pid}). Saindo para evitar conflito 440.`);
    process.exit(0);
  } catch {
    // Processo nao existe mais — lock antigo, continua
  }
}

fs.writeFileSync(lockFile, process.pid.toString());

function limparLock() { try { fs.unlinkSync(lockFile); } catch {} }
process.on("exit", limparLock);
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));

function iniciar() {
  const bot = spawn("node", ["--env-file=.env", "index.js"], { stdio: "inherit", cwd: __dirname });
  bot.on("close", (code) => {
    if (code === null || code === 0) return;
    console.log(`\n[launcher] Bot encerrado (codigo ${code}). Reiniciando em 3s...\n`);
    setTimeout(iniciar, 3000);
  });
}

iniciar();
