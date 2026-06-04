#!/data/data/com.termux/files/usr/bin/bash
# Autoria Leo-Shiba GitHub
set -e

echo ""
echo "======================================"
echo "  Bot de Moderação WhatsApp - Setup"
echo "======================================"
echo ""

pkg update -y && pkg upgrade -y
pkg install nodejs -y
npm install

if [ ! -f .env ]; then
  while true; do
    read -p "Seu número WhatsApp (ex. 5511987654321): " NUMERO
    NUMERO=$(echo "$NUMERO" | tr -d ' -.()+')
    if echo "$NUMERO" | grep -qE '^[0-9]{12,13}$'; then break; fi
    echo "Número inválido. Tente novamente."
  done
  echo "DONOS=$NUMERO" > .env
fi

read -p "Iniciar o bot agora? (s/n): " INICIAR
if [ "$INICIAR" = "s" ] || [ "$INICIAR" = "S" ]; then
  read -p "Rodar em segundo plano? (s/n): " BACKGROUND
  if [ "$BACKGROUND" = "s" ] || [ "$BACKGROUND" = "S" ]; then
    nohup npm start > bot.log 2>&1 &
    echo "Bot em segundo plano! Use: tail -f bot.log"
  else
    npm start
  fi
fi
