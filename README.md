<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=25D366&height=200&section=header&text=Mod-Bot&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Bot%20de%20Modera%C3%A7%C3%A3o%20para%20WhatsApp&descAlignY=60&descSize=22&descColor=ffffff" width="100%"/>

<br/>

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://github.com/Leo-Shiba/mod-bot)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Baileys](https://img.shields.io/badge/Baileys-latest-0078D4?style=for-the-badge)](https://github.com/WhiskeySockets/Baileys)
[![Termux](https://img.shields.io/badge/Termux-Android-black?style=for-the-badge&logo=android&logoColor=white)](https://github.com/termux/termux-app/releases/latest)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow?style=for-the-badge)](./LICENSE)

<br/>

> **Bot de moderação para grupos do WhatsApp, feito para rodar 100% pelo celular via Termux.**
> Sem servidor, sem VPS, sem custo.

<br/>

[📱 Instalação](#-tutorial--instalação-no-termux-passo-a-passo) · [💬 Comandos](#-comandos) · [✨ Funcionalidades](#-funcionalidades) · [🗂️ Estrutura](#️-estrutura-do-projeto)

</div>

---

## ✨ Funcionalidades

<table>
<tr>
<td width="50%">

**🛡️ Proteção**
| | Descrição |
|---|---|
| 🔗 **Anti-link** | Apaga mensagens com links automaticamente |
| 🌊 **Anti-flood** | Detecta e pune spam de mensagens |
| 🚫 **Palavras proibidas** | Remove mensagens com palavras configuráveis |
| 📸 **Anti-status** | Bloqueia quando alguém compartilha status no grupo |
| 🔇 **Silenciar** | Impede que um membro envie mensagens por X minutos |
| ⚠️ **Sistema de avisos** | Acumula avisos e bane ao atingir o limite |

</td>
<td width="50%">

**⚙️ Gestão**
| | Descrição |
|---|---|
| 👋 **Boas-vindas e saída** | Mensagens automáticas personalizáveis |
| 🔒 **Trancar grupo** | Restringe envio apenas para admins |
| 🗑️ **Limpar mensagens** | Apaga as últimas N mensagens |
| 👑 **Promover / rebaixar** | Gerencia admins do grupo |
| ⚙️ **Config por grupo** | Cada grupo tem suas próprias configurações |
| 💬 **Respostas no PV** | Comandos de admin respondem no privado |

</td>
</tr>
</table>

---

## 📱 Tutorial — Instalação no Termux (passo a passo)

> O bot roda direto no seu Android. Siga os passos abaixo do zero.

### 1. Instalar o Termux

> [!WARNING]
> **Não use a versão da Play Store** — ela está desatualizada e vai dar erro.

1. Acesse **[github.com/termux/termux-app/releases/latest](https://github.com/termux/termux-app/releases/latest)** pelo celular
2. Baixe o arquivo **`termux-app_v*.apk`** (universal ou arm64-v8a para a maioria dos celulares)
3. Instale o APK e abra o Termux

---

### 2. Configurar o Termux

Cole cada bloco de comandos no Termux e aguarde terminar:

**Atualizar pacotes:**
```bash
pkg update && pkg upgrade -y
```

**Instalar dependências:**
```bash
pkg install nodejs git -y
```

**Verificar instalação:**
```bash
node -v && git --version
```
> Deve mostrar a versão do Node.js (ex: `v26.x.x`) e do Git.

---

### 3. Clonar o repositório

```bash
git clone https://github.com/Leo-Shiba/mod-bot.git
cd mod-bot
```

---

### 4. Instalar dependências do bot

```bash
npm install
```

> Aguarde baixar todos os pacotes. Pode demorar alguns minutos na primeira vez.

---

### 5. Iniciar o bot

```bash
npm start
```

Na **primeira execução** o bot exibe um QR Code no terminal.

Abra o WhatsApp no celular e escaneie:
**Configurações → Aparelhos conectados → Conectar aparelho**

> [!TIP]
> ✅ Quando aparecer `Conectado ao WhatsApp!` o bot está pronto para uso.

---

### 6. Manter o bot rodando

Para o bot não parar quando você fechar o Termux:

1. Deslize da esquerda para a direita no Termux para abrir o menu lateral
2. Toque em **New Session** — isso cria uma nova aba
3. Na aba com o bot rodando, **não feche** — minimize o Termux

**Ative o Wakelock** para o Termux não ser encerrado pelo sistema:
```bash
termux-wake-lock
```

---

### 7. Parar o bot

Pressione `Ctrl + C` no terminal onde o bot está rodando.

---

### 8. Reiniciar após fechar o Termux

```bash
cd mod-bot && npm start
```

---

## 💬 Comandos

> Todos os comandos usam o prefixo `!`. A maioria também aceita em inglês.
> Comandos de admin reagem no grupo e enviam a resposta no **seu PV**.

### 🌐 Públicos

| Comando | Descrição |
|:--|:--|
| `!regras` / `!rules` | Mostra as regras do grupo |

### 🔐 Moderação _(admin)_

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!banir @membro` | `!kick` | Remove o membro do grupo |
| `!avisar @membro [motivo]` | `!warn` | Adiciona um aviso ao membro |
| `!resetar @membro` | `!clearwarn` | Zera os avisos do membro |
| `!silenciar @membro [min]` | `!mute` | Silencia por X minutos (padrão: 30) |
| `!dessilenciar @membro` | `!unmute` | Remove o silêncio |
| `!avisos [@membro]` | `!warns` | Ver avisos e histórico de motivos |

### 🏛️ Gestão do grupo _(admin)_

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!promover @membro` | `!promote` | Promove a admin |
| `!rebaixar @membro` | `!demote` | Remove admin |
| `!trancar` | `!lock` | Bloqueia envio para não-admins |
| `!destrancar` | `!unlock` | Libera envio para todos |
| `!limpar [n]` | `!clear` | Apaga as últimas N mensagens (padrão: 10) |

### ⚙️ Configuração _(admin)_

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!config` | `!cfg` | Painel de configurações do grupo |
| `!config antilink on/off` | — | Ativa/desativa anti-link |
| `!config antiflood on/off` | — | Ativa/desativa anti-flood |
| `!config antistatus on/off` | — | Ativa/desativa anti-status |
| `!config boasvindas on/off` | — | Ativa/desativa boas-vindas |
| `!config saida on/off` | — | Ativa/desativa mensagem de saída |
| `!config maxavisos <n>` | — | Limite de avisos antes do ban |
| `!config floodlimite <n>` | — | Mensagens por 10s antes do flood |
| `!setregras <texto>` | `!setrules` | Define as regras do grupo |
| `!setboasvindas <msg>` | `!setwelcome` | Mensagem de boas-vindas (`{nome}` = menção) |
| `!setsaida <msg>` | `!setleave` | Mensagem de saída (`{nome}` = menção) |

### 🚫 Palavras proibidas _(admin)_

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!palavras` | `!words` | Lista as palavras proibidas |
| `!addpalavra <palavra>` | `!addword` | Adiciona palavra proibida |
| `!rmpalavra <palavra>` | `!rmword` | Remove palavra proibida |

### 🛠️ Utilitários _(admin)_

| Comando | Descrição |
|:--|:--|
| `!info` | Status e informações do grupo |
| `!admins` | Lista os admins do grupo |
| `!ping` | Verifica latência do bot |
| `!ajuda` / `!help` | Lista todos os comandos |

---

## ⚙️ Configuração

O arquivo `.env` é opcional. Copie o exemplo se quiser personalizar:

```bash
cp .env.example .env
```

---

## 🗂️ Estrutura do projeto

```
mod-bot/
├── 📄 index.js          # Conexão WhatsApp, proteções automáticas
├── 📄 launcher.js       # Auto-reinício + lock de instância única
├── 📄 config.js         # Configurações gerais
│
├── 📂 core/
│   ├── database.js      # SQLite (sql.js) — sem dependência externa
│   ├── commandHandler.js # Roteamento de comandos
│   ├── seguranca.js     # Rate limiting
│   ├── buffer.js        # Buffer de mensagens (para !limpar)
│   ├── notificar.js     # Controle de intervalo de notificações
│   └── utils.js         # Helpers: reagir, responderPV, etc.
│
├── 📂 commands/         # Um arquivo por comando
│
├── 📂 data/
│   ├── auth/            # Sessão WhatsApp (gitignored)
│   └── bot.db           # Banco de dados (gitignored)
│
└── 🧪 test_bot.js       # 101 testes automatizados
```

---

## 🧪 Testes

```bash
npm test
```

---

## 📦 Dependências

| Pacote | Uso |
|:--|:--|
| [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) | Conexão com WhatsApp Web |
| [`pino`](https://getpino.io) | Logger |
| [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) | QR Code no terminal |

---

## 📝 Licença

Distribuído sob a licença **MIT** — use, modifique e distribua à vontade.

---

<div align="center">

Feito com 💚 por **[Leo-Shiba](https://github.com/Leo-Shiba)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=25D366&height=100&section=footer" width="100%"/>

</div>
