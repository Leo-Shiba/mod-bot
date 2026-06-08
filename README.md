<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:CC4500,100:FF8C00&height=220&section=header&text=Mod-Bot&fontSize=85&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Bot%20de%20Moderação%20para%20WhatsApp&descAlignY=62&descSize=22&descColor=ffffffcc" width="100%"/>

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=FF8C00&center=true&vCenter=true&width=600&lines=Bot+de+moderação+para+WhatsApp+🔥;Rode+direto+no+Android+via+Termux+📱;Sem+servidor.+Sem+mensalidade.+✅;Instala+em+minutos+e+funciona+24h+🚀)](https://git.io/typing-svg)

<br/>

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-FF6B00?style=for-the-badge&logo=whatsapp&logoColor=white)](https://github.com/Leo-Shiba/mod-bot)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Baileys](https://img.shields.io/badge/Baileys-6.7.9-FF8C00?style=for-the-badge&logoColor=white)](https://github.com/WhiskeySockets/Baileys)
[![Termux](https://img.shields.io/badge/Termux-Android-1a1a1a?style=for-the-badge&logo=android&logoColor=FF6B00)](https://github.com/termux/termux-app/releases/latest)
[![Licença](https://img.shields.io/badge/Licença-MIT-FF6B00?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](./LICENSE)

<br/>

[![Stars](https://img.shields.io/github/stars/Leo-Shiba/mod-bot?style=social)](https://github.com/Leo-Shiba/mod-bot/stargazers)
[![Forks](https://img.shields.io/github/forks/Leo-Shiba/mod-bot?style=social)](https://github.com/Leo-Shiba/mod-bot/network)

<br/>

> 🤖 **Bot completo de moderação de grupos WhatsApp, feito para rodar direto no celular via Termux.**
> Sem servidor. Sem mensalidade. Instala em minutos e funciona 24h no seu Android.

<br/>

[📥 Instalação](#-instalação-no-celular-android) · [⚙️ Comandos](#️-comandos) · [🤖 Automações](#-automações) · [🔧 Problemas](#-solução-de-problemas) · [📁 Estrutura](#-estrutura-do-projeto)

</div>

---

## ✨ O que o bot faz

<table>
<tr>
<td align="center" width="25%">

### 🛡️ Moderação
Banir · Avisar · Silenciar
Sistema de avisos automático
Ban ao atingir o limite

</td>
<td align="center" width="25%">

### 🤖 Automações
Anti-link · Anti-flood
Palavras proibidas
Boas-vindas e despedida

</td>
<td align="center" width="25%">

### 👥 Gestão
Promover · Rebaixar · Trancar
Regras · Limpeza em massa
Histórico de infrações

</td>
<td align="center" width="25%">

### 📊 Informações
Stats do grupo · Lista de admins
Histórico de avisos
Painel de configurações

</td>
</tr>
</table>

---

## 🖼️ Guia Visual de Comandos

<div align="center">

<img src="./assets/comandos-banner.svg" alt="Referência de Comandos" width="100%"/>

</div>

---

## 📲 Instalação no celular (Android)

<div align="center">

<img src="./assets/instalacao-banner.svg" alt="Guia de Instalação" width="100%"/>

</div>

<br/>

### Pré-requisitos

<div align="center">

| ✅ | Requisito |
|:--:|:--|
| 📱 | Android 7.0 ou superior |
| 📦 | App **Termux** (via GitHub Releases — veja abaixo) |
| 🌐 | Conexão com internet |

</div>

---

### ![1](https://img.shields.io/badge/PASSO-1-FF6B00?style=flat-square&logoColor=white) &nbsp; Instalar o Termux

> [!WARNING]
> **Não use a Play Store** — a versão de lá é desatualizada e quebra a instalação.
> **Não use o F-Droid** — baixe diretamente pelo GitHub para garantir a versão mais recente e confiável.

Acesse no celular e instale o `.apk` mais recente:

**👉 https://github.com/termux/termux-app/releases/latest**

---

### ![2](https://img.shields.io/badge/PASSO-2-CC4500?style=flat-square&logoColor=white) &nbsp; Atualizar e instalar dependências

Abra o **Termux** e rode os comandos abaixo, **um de cada vez**:

```bash
pkg update && pkg upgrade -y
```

```bash
pkg install nodejs git -y
```

```bash
node -v && git --version
```

> ✅ Se aparecer as versões do Node e do Git, está tudo certo!

---

### ![3](https://img.shields.io/badge/PASSO-3-FF6B00?style=flat-square&logoColor=white) &nbsp; Clonar o repositório

```bash
git clone https://github.com/Leo-Shiba/mod-bot.git && cd mod-bot
```

---

### ![4](https://img.shields.io/badge/PASSO-4-CC4500?style=flat-square&logoColor=white) &nbsp; Instalar as dependências do bot

```bash
npm install
```

> ⏳ Pode demorar alguns minutos na primeira vez.

---

### ![5](https://img.shields.io/badge/PASSO-5-FF6B00?style=flat-square&logoColor=white) &nbsp; Iniciar o bot e escanear o QR Code

```bash
npm start
```

Um **QR Code** aparecerá no terminal. Para conectar:

```
WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho
```

> [!TIP]
> ✅ Quando aparecer **"Conectado ao WhatsApp!"** o bot está online e pronto!

---

### ![6](https://img.shields.io/badge/PASSO-6-CC4500?style=flat-square&logoColor=white) &nbsp; Manter o bot ligado (recomendado)

```bash
termux-wake-lock
```

> Isso impede o Android de encerrar o Termux com a tela apagada.

---

### 🔁 Religar o bot depois

```bash
cd mod-bot && npm start
```

Para encerrar: `Ctrl + C`

---

## ⚙️ Comandos

> Todos os comandos usam o prefixo `!`. Comandos em **PT** e **EN** são aceitos igualmente.

### 🔐 Moderação e Gestão (admins)

<div align="center">

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!banir @membro` | `!kick` | Remove o membro do grupo |
| `!avisar @membro [motivo]` | `!warn` | Adiciona aviso (ao atingir o limite → ban) |
| `!resetar @membro` | `!clearwarn` | Zera os avisos de um membro |
| `!silenciar @membro [min]` | `!mute` | Silencia temporariamente |
| `!dessilenciar @membro` | `!unmute` | Remove o silêncio |
| `!promover @membro` | `!promote` | Torna o membro administrador |
| `!rebaixar @membro` | `!demote` | Remove a administração |
| `!trancar` | `!lock` | Bloqueia envio para não-admins |
| `!destrancar` | `!unlock` | Libera envio para todos |
| `!limpar [n]` | `!clear` | Apaga as últimas N mensagens (máx 50) |

</div>

### ⚙️ Configuração (admins)

<div align="center">

| Comando | Descrição |
|:--|:--|
| `!config` / `!cfg` | Painel de configurações do grupo |
| `!config antilink on/off` | Liga/desliga bloqueio de links |
| `!config antiflood on/off` | Liga/desliga controle de spam |
| `!config antistatus on/off` | Liga/desliga anti-status |
| `!config boasvindas on/off` | Liga/desliga mensagem de boas-vindas |
| `!config saida on/off` | Liga/desliga mensagem de despedida |
| `!config maxavisos <n>` | Define o limite de avisos antes do ban |
| `!config floodlimite <n>` | Msgs por 10s antes de acionar o anti-flood |
| `!setboasvindas <msg>` / `reset` | Personaliza a mensagem de entrada |
| `!setsaida <msg>` / `reset` | Personaliza a mensagem de saída |
| `!setregras <texto>` | Define as regras do grupo |
| `!palavras` | Lista palavras proibidas |
| `!addpalavra <palavra>` | Adiciona palavra à lista negra |
| `!rmpalavra <palavra>` | Remove palavra da lista negra |

</div>

### 🌐 Comandos Públicos

<div align="center">

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!regras` | `!rules` | Mostra as regras do grupo |
| `!avisos [@membro]` | `!warns` | Consulta avisos de um membro |
| `!admins` | — | Lista os administradores |
| `!info` | — | Estatísticas do grupo |
| `!ping` | — | Latência do bot |
| `!ajuda` | `!help` | Lista todos os comandos |

</div>

---

## 🤖 Automações

<div align="center">

| Automação | Padrão | Comportamento |
|:--|:--:|:--|
| 👋 Boas-vindas | ✅ Ligado | Mensagem ao entrar no grupo |
| 🚪 Despedida | 🔴 Desligado | Mensagem ao sair do grupo |
| 🔗 Anti-link | 🔴 Desligado | Apaga mensagens com links |
| 💬 Anti-flood | 🔴 Desligado | Avisa quem envia mensagens rápido demais |
| 📸 Anti-status | 🔴 Desligado | Impede visualização de status automática |
| 🤬 Palavras proibidas | ✅ Sempre ativo | Apaga mensagens com palavras da lista negra |
| 🔨 Ban automático | ✅ Ativo | Bane ao atingir o limite de avisos (padrão: 3) |

</div>

### Personalizar mensagens

Use `{nome}` para mencionar o membro automaticamente:

```bash
!setboasvindas Bem-vindo(a) ao grupo, {nome}! Leia as !regras 📋
!setsaida Até mais, {nome}! Foi um prazer ter você aqui 👋
```

---

## 🔧 Solução de problemas

<details>
<summary><b>❓ QR Code não aparece ou expirou</b></summary>

```bash
rm -rf data/auth && npm start
```
</details>

<details>
<summary><b>❓ Bot parou de responder</b></summary>

```bash
cd mod-bot && npm start
```
O bot reconecta automaticamente na maioria dos casos.
</details>

<details>
<summary><b>❓ Erro "pkg: command not found"</b></summary>

Certifique-se de que está usando o **Termux do GitHub**, não da Play Store. Reinstale se necessário.
</details>

<details>
<summary><b>❓ Node.js muito antigo (erro no npm install)</b></summary>

```bash
pkg install nodejs-lts -y
```
</details>

<details>
<summary><b>❓ Bot encerrado com a tela apagada</b></summary>

Execute `termux-wake-lock` e configure o Termux como app sem restrição de bateria:
**Configurações → Aplicativos → Termux → Bateria → Sem restrições**
</details>

---

## 🧱 Estrutura do projeto

```
mod-bot/
│
├── 📄 index.js              # Núcleo: conexão, eventos, anti-flood, anti-link
├── 📄 launcher.js           # Inicializador com keep-alive
├── 📄 config.js             # Configurações gerais
│
├── 📂 core/
│   ├── commandHandler.js    # Carrega e processa comandos
│   ├── database.js          # Banco SQLite (avisos, config, grupos)
│   ├── seguranca.js         # Verificação de permissões
│   ├── notificar.js         # Notificações para o dono
│   ├── buffer.js            # Buffer de mensagens para !limpar
│   └── utils.js             # Funções utilitárias
│
├── 📂 commands/             # Um arquivo por comando
│   ├── ajuda.js
│   ├── avisar.js
│   ├── banir.js
│   └── ...
│
└── 📂 assets/               # Imagens e guias visuais
    ├── instalacao-banner.svg
    └── comandos-banner.svg
```

---

## 📦 Dependências

<div align="center">

| Pacote | Uso |
|:--|:--|
| [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) | Conexão com WhatsApp Web |
| [`pino`](https://getpino.io) | Logger |
| [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) | QR Code no terminal |
| [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) | Banco de dados local |

</div>

---

## 📝 Licença

Distribuído sob a licença **MIT** — use, modifique e distribua à vontade.

---

<div align="center">

Feito com 🧡 por **[Leo-Shiba](https://github.com/Leo-Shiba)**

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Leo--Shiba-1a1a1a?style=for-the-badge&logo=github&logoColor=FF6B00)](https://github.com/Leo-Shiba)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:CC4500,100:FF8C00&height=120&section=footer" width="100%"/>

</div>
