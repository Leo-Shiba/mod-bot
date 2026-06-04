<div align="center">

<img src="https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Baileys-6.7.9-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Termux-Android-black?style=for-the-badge&logo=android&logoColor=white"/>
<img src="https://img.shields.io/badge/Licença-MIT-yellow?style=for-the-badge"/>

# 🛡️ Mod-Bot — Bot de Moderação para WhatsApp

**Bot completo de moderação de grupos WhatsApp, feito para rodar direto no celular via Termux.**  
Sem servidor, sem mensalidade. Instala em minutos e funciona 24h no seu Android.

[📥 Como instalar](#-instalação-no-celular-android) • [⚙️ Comandos](#️-comandos) • [🤖 Automações](#-automações) • [📄 Tutoriais em PDF](#-tutoriais-em-pdf)

</div>

---

## ✨ O que o bot faz

- 🔨 **Banir, promover e rebaixar** membros com um comando
- ⚠️ **Sistema de avisos** — ban automático ao atingir o limite
- 🔇 **Silenciar temporariamente** — remove e re-adiciona após o tempo definido
- 🚫 **Anti-link** — apaga links automaticamente
- 💬 **Anti-flood** — avisa quem manda mensagens em excesso
- 🤬 **Palavras proibidas** — remove mensagens com palavras da lista negra
- 👋 **Boas-vindas e despedida** personalizáveis com `{nome}`
- 📜 **Regras do grupo** acessíveis por qualquer membro
- 🧹 **Limpar mensagens** em massa
- 📊 **Estatísticas do grupo** com `!info`

---

## 📄 Tutoriais em PDF

Dois guias prontos para você compartilhar com quem quiser instalar o bot:

| Arquivo | Conteúdo |
|---------|----------|
| [`tutorial-instalacao.pdf`](./tutorial-instalacao.pdf) | Passo a passo completo de instalação no Termux |
| [`referencia-comandos.pdf`](./referencia-comandos.pdf) | Referência rápida de todos os comandos |

---

## 📲 Instalação no celular (Android)

### O que você vai precisar

- Android 7.0 ou superior
- App **Termux** (gratuito, pelo F-Droid — veja abaixo)
- A pasta do bot no celular

---

### Passo 1 — Instalar o Termux

> ⚠️ **Não use a Play Store** — a versão de lá é antiga e quebra a instalação.

1. Acesse **https://f-droid.org** no celular e instale o F-Droid
2. Abra o F-Droid, busque **Termux** e instale

---

### Passo 2 — Colocar a pasta do bot no celular

Baixe ou transfira a pasta do bot para o celular (via USB, Google Drive, etc.) e coloque em **Downloads**.

Abra o Termux e rode, **um de cada vez**:

```bash
termux-setup-storage
```
> Aparecerá uma janela pedindo permissão de armazenamento — toque em **Permitir**.

```bash
cp -r /sdcard/Download/mod-bot ~/mod-bot && cd ~/mod-bot
```

> Se a pasta estiver em outro local, ajuste o caminho acima.

---

### Passo 3 — Rodar o setup

```bash
bash setup-termux.sh
```

O script faz tudo automaticamente:
- Instala o Node.js e as dependências
- Pede seu **número de WhatsApp** (sem precisar editar arquivo)
- Pergunta se quer iniciar o bot agora
- Pergunta se quer rodar em segundo plano (com a tela apagada)

---

### Passo 4 — Escanear o QR Code

Quando o bot iniciar, um QR Code aparecerá no terminal. Escaneie pelo WhatsApp:

**WhatsApp → Menu (⋮) → Aparelhos conectados → Conectar aparelho**

✅ Pronto — o bot está online!

---

### Manter o bot ligado com a tela apagada

O setup já pergunta sobre isso. Caso queira configurar manualmente:

1. **Configurações → Aplicativos → Termux → Bateria** → Selecione **Sem restrições**
2. No painel de notificações, segure a notificação do Termux e marque como **Persistente**

---

### Religar o bot depois

```bash
cd ~/mod-bot && npm start
```

---

## ⚙️ Comandos

Todos começam com `!`. Admins têm acesso a tudo; membros comuns só aos comandos públicos.

### 🔐 Comandos de Administrador

| Comando | O que faz |
|---------|-----------|
| `!config` | Mostra o que está ligado/desligado no grupo |
| `!config antilink on/off` | Liga/desliga o bloqueio de links |
| `!config antiflood on/off` | Liga/desliga o aviso contra spam |
| `!config boasvindas on/off` | Liga/desliga a mensagem de boas-vindas |
| `!config saida on/off` | Liga/desliga a mensagem de despedida |
| `!config maxavisos <número>` | Define quantos avisos antes do ban (padrão: 3) |
| `!setboasvindas <mensagem>` | Personaliza a mensagem de boas-vindas |
| `!setboasvindas reset` | Volta para a mensagem padrão |
| `!setsaida <mensagem>` | Personaliza a mensagem de despedida |
| `!setsaida reset` | Volta para a mensagem padrão |
| `!setregras <texto>` | Define as regras do grupo |
| `!palavras` | Lista as palavras proibidas |
| `!palavras add <palavra>` | Adiciona uma palavra proibida |
| `!palavras rm <palavra>` | Remove uma palavra proibida |
| `!banir @membro` | Remove o membro do grupo |
| `!avisar @membro [motivo]` | Dá um aviso (ao atingir o limite → ban) |
| `!resetar @membro` | Zera os avisos de um membro |
| `!silenciar @membro [minutos]` | Remove temporariamente e re-adiciona depois |
| `!promover @membro` | Torna o membro administrador |
| `!rebaixar @membro` | Remove a administração do membro |
| `!limpar [número]` | Apaga as últimas N mensagens (máximo 50) |

### 🌐 Comandos Públicos

| Comando | O que faz |
|---------|-----------|
| `!regras` | Mostra as regras do grupo |
| `!avisos [@membro]` | Mostra quantos avisos alguém tem |
| `!admins` | Lista os administradores |
| `!info` | Estatísticas do grupo |
| `!ajuda` | Lista todos os comandos disponíveis |

---

## 🤖 Automações

O bot age sozinho em várias situações:

| Automação | Comportamento padrão |
|-----------|----------------------|
| 👋 Boas-vindas | **Ligado** — manda mensagem quando alguém entra |
| 👋 Despedida | Desligado — manda mensagem quando alguém sai |
| 🤬 Palavras proibidas | Sempre ativo — apaga mensagens da lista negra |
| 🔗 Anti-link | Desligado — apaga mensagens com links |
| 💬 Anti-flood | Desligado — avisa quem manda mensagens rápido demais |
| 🔨 Ban automático | Ativo — bane após atingir o limite de avisos (padrão: 3) |

### Personalizar mensagens

Use `{nome}` para mencionar o membro automaticamente:

```
!setboasvindas Olá, {nome}! Seja bem-vindo(a). Leia as regras com !regras.
!setsaida Até mais, {nome}! Foi bom ter você aqui.
```

---

## 🔧 Solução de problemas

**QR Code não aparece ou expirou:**
```bash
rm -rf data/auth && npm start
```

**Bot parou de responder:**
```bash
npm start
```
O bot reconecta automaticamente na maioria dos casos.

**Erro de permissão ao copiar arquivos:**
```bash
termux-setup-storage
```
Aceite a permissão e tente novamente.

**Node.js muito antigo (erro no setup):**
```bash
pkg install nodejs-lts -y
```

---

## 🧱 Estrutura do projeto

```
mod-bot/
├── index.js              # Núcleo: conexão, eventos, anti-flood, anti-link
├── launcher.js           # Inicializador com keep-alive
├── config.js             # Configurações gerais
├── setup-termux.sh       # Script de instalação automática
├── core/
│   ├── commandHandler.js # Carrega e processa comandos
│   ├── database.js       # Banco SQLite (avisos, config, grupos)
│   ├── seguranca.js      # Verificação de permissões
│   ├── notificar.js      # Notificações para o dono
│   ├── buffer.js         # Buffer de mensagens para !limpar
│   └── utils.js          # Funções utilitárias
├── commands/             # Um arquivo por comando
│   ├── ajuda.js
│   ├── avisar.js
│   ├── banir.js
│   └── ...
├── tutorial-instalacao.pdf
└── referencia-comandos.pdf
```

---

## 📦 Dependências

| Pacote | Uso |
|--------|-----|
| [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) | Conexão com WhatsApp Web |
| [`pino`](https://getpino.io) | Logger |
| [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) | QR Code no terminal |

---

## 📝 Licença

MIT — use, modifique e distribua à vontade.  
Feito por **Leo-Shiba** • [GitHub](https://github.com/Leo-Shiba)
