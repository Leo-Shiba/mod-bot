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

![PASSO 1](https://img.shields.io/badge/PASSO-1-FF6B00?style=flat-square&logoColor=white)

### Instalar o Termux

> [!WARNING]
> **Não use a Play Store** — a versão de lá é desatualizada e quebra a instalação.
> **Não use o F-Droid** — baixe diretamente pelo GitHub para garantir a versão mais recente e confiável.

Acesse no celular e instale o `.apk` mais recente:

**👉 https://github.com/termux/termux-app/releases/latest**

---

![PASSO 2](https://img.shields.io/badge/PASSO-2-CC4500?style=flat-square&logoColor=white)

### Atualizar e instalar dependencias

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

> ✅ Se aparecer as versoes do Node e do Git, esta tudo certo!

---

![PASSO 3](https://img.shields.io/badge/PASSO-3-FF6B00?style=flat-square&logoColor=white)

### Clonar o Projeto

```bash
git clone https://github.com/Leo-Shiba/mod-bot.git && cd mod-bot
```

---

![PASSO 4](https://img.shields.io/badge/PASSO-4-CC4500?style=flat-square&logoColor=white)

### Instalar as dependencias do bot

```bash
npm install
```

> ⏳ Pode demorar alguns minutos na primeira vez.

---

![PASSO 5](https://img.shields.io/badge/PASSO-5-FF6B00?style=flat-square&logoColor=white)

### Iniciar o bot e escanear o QR Code

```bash
npm start
```

Um **QR Code** aparecera no terminal. Para conectar:

```
WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho
```

> [!TIP]
> ✅ Quando aparecer **"Conectado ao WhatsApp!"** o bot esta online e pronto!

---

![PASSO 6](https://img.shields.io/badge/PASSO-6-CC4500?style=flat-square&logoColor=white)

### Manter o bot ligado (recomendado)

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

> Todos os comandos usam o prefixo `!`. Comandos em **PT** e **EN** sao aceitos igualmente.

### 🔐 Moderação e Gestão (admins)

<div align="center">

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!banir @membro` | `!kick` | Remove o membro do grupo |
| `!avisar @membro [motivo]` | `!warn` | Adiciona aviso (ao atingir o limite → ban) |
| `!resetar @membro` | `!clearwarn` | Zera os avisos de um membro |
| `!silenciar @membro [min]` | `!mute` | Silencia temporariamente |
| `!dessilenciar @membro` | `!unmute` | Remove o silencio |
| `!promover @membro` | `!promote` | Torna o membro administrador |
| `!rebaixar @membro` | `!demote` | Remove a administracao |
| `!trancar` | `!lock` | Bloqueia envio para nao-admins |
| `!destrancar` | `!unlock` | Libera envio para todos |
| `!limpar [n]` | `!clear` | Apaga as ultimas N mensagens (max 50) |

</div>

### ⚙️ Configuração (admins)

<div align="center">

| Comando | Descrição |
|:--|:--|
| `!config` / `!cfg` | Painel de configuracoes do grupo |
| `!config antilink on/off` | Liga/desliga bloqueio de links |
| `!config antiflood on/off` | Liga/desliga controle de spam |
| `!config antistatus on/off` | Liga/desliga anti-status |
| `!config boasvindas on/off` | Liga/desliga mensagem de boas-vindas |
| `!config saida on/off` | Liga/desliga mensagem de despedida |
| `!config maxavisos <n>` | Define o limite de avisos antes do ban |
| `!config floodlimite <n>` | Msgs por 10s antes de acionar o anti-flood |
| `!setboasvindas <msg>` / `reset` | Personaliza a mensagem de entrada |
| `!setsaida <msg>` / `reset` | Personaliza a mensagem de saida |
| `!setregras <texto>` | Define as regras do grupo |
| `!palavras` | Lista palavras proibidas |
| `!addpalavra <palavra>` | Adiciona palavra a lista negra |
| `!rmpalavra <palavra>` | Remove palavra da lista negra |

</div>

### 🌐 Comandos Publicos

<div align="center">

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!regras` | `!rules` | Mostra as regras do grupo |
| `!avisos [@membro]` | `!warns` | Consulta avisos de um membro |
| `!admins` | — | Lista os administradores |
| `!info` | — | Estatisticas do grupo |
| `!ping` | — | Latencia do bot |
| `!ajuda` | `!help` | Lista todos os comandos |

</div>

---

## 🤖 Automações

<div align="center">

| Automação | Padrão | Comportamento |
|:--|:--:|:--|
| 👋 Boas-vindas | ✅ Ligado | Mensagem ao entrar no grupo |
| 🚪 Despedida | Desligado | Mensagem ao sair do grupo |
| 🔗 Anti-link | Desligado | Apaga mensagens com links |
| 💬 Anti-flood | Desligado | Avisa quem envia mensagens rapido demais |
| 📸 Anti-status | Desligado | Impede visualizacao de status automatica |
| 🤬 Palavras proibidas | ✅ Sempre ativo | Apaga mensagens com palavras da lista negra |
| 🔨 Ban automatico | ✅ Ativo | Bane ao atingir o limite de avisos (padrao: 3) |

</div>

### Personalizar mensagens

Use `{nome}` para mencionar o membro automaticamente:

```bash
!setboasvindas Bem-vindo(a) ao grupo, {nome}! Leia as !regras 📋
!setsaida Ate mais, {nome}! Foi um prazer ter voce aqui 👋
```

---

## 🔧 Solução de problemas

<details>
<summary><b>❓ QR Code nao aparece ou expirou</b></summary>

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

Certifique-se de que esta usando o **Termux do GitHub**, nao da Play Store. Reinstale se necessario.
</details>

<details>
<summary><b>❓ Node.js muito antigo (erro no npm install)</b></summary>

```bash
pkg install nodejs-lts -y
```
</details>

<details>
<summary><b>❓ Bot encerrado com a tela apagada</b></summary>

Execute `termux-wake-lock` e configure o Termux como app sem restricao de bateria:
**Configurações → Aplicativos → Termux → Bateria → Sem restrições**
</details>

---

## 🧱 Estrutura do projeto

```
mod-bot/
│
├── 📄 index.js              # Nucleo: conexao, eventos, anti-flood, anti-link
├── 📄 launcher.js           # Inicializador com keep-alive
├── 📄 config.js             # Configuracoes gerais
│
├── 📂 core/
│   ├── commandHandler.js    # Carrega e processa comandos
│   ├── database.js          # Banco SQLite (avisos, config, grupos)
│   ├── seguranca.js         # Verificacao de permissoes
│   ├── notificar.js         # Notificacoes para o dono
│   ├── buffer.js            # Buffer de mensagens para !limpar
│   └── utils.js             # Funcoes utilitarias
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

## 📦 Dependencias

<div align="center">

| Pacote | Uso |
|:--|:--|
| [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) | Conexao com WhatsApp Web |

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

![PASSO 1](https://img.shields.io/badge/PASSO-1-FF6B00?style=flat-square&logoColor=white)

### Instalar o Termux

> [!WARNING]
> **Não use a Play Store** — a versão de lá é desatualizada e quebra a instalação.
> **Não use o F-Droid** — baixe diretamente pelo GitHub para garantir a versão mais recente e confiável.

Acesse no celular e instale o `.apk` mais recente:

**👉 https://github.com/termux/termux-app/releases/latest**

---

![PASSO 2](https://img.shields.io/badge/PASSO-2-CC4500?style=flat-square&logoColor=white)

### Atualizar e instalar dependencias

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

> ✅ Se aparecer as versoes do Node e do Git, esta tudo certo!

---

![PASSO 3](https://img.shields.io/badge/PASSO-3-FF6B00?style=flat-square&logoColor=white)

### Clonar o Projeto

```bash
git clone https://github.com/Leo-Shiba/mod-bot.git && cd mod-bot
```

---

![PASSO 4](https://img.shields.io/badge/PASSO-4-CC4500?style=flat-square&logoColor=white)

### Instalar as dependencias do bot

```bash
npm install
```

> ⏳ Pode demorar alguns minutos na primeira vez.

---

![PASSO 5](https://img.shields.io/badge/PASSO-5-FF6B00?style=flat-square&logoColor=white)

### Iniciar o bot e escanear o QR Code

```bash
npm start
```

Um **QR Code** aparecera no terminal. Para conectar:

```
WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho
```

> [!TIP]
> ✅ Quando aparecer **"Conectado ao WhatsApp!"** o bot esta online e pronto!

---

![PASSO 6](https://img.shields.io/badge/PASSO-6-CC4500?style=flat-square&logoColor=white)

### Manter o bot ligado (recomendado)

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

> Todos os comandos usam o prefixo `!`. Comandos em **PT** e **EN** sao aceitos igualmente.

### 🔐 Moderação e Gestão (admins)

<div align="center">

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!banir @membro` | `!kick` | Remove o membro do grupo |
| `!avisar @membro [motivo]` | `!warn` | Adiciona aviso (ao atingir o limite → ban) |
| `!resetar @membro` | `!clearwarn` | Zera os avisos de um membro |
| `!silenciar @membro [min]` | `!mute` | Silencia temporariamente |
| `!dessilenciar @membro` | `!unmute` | Remove o silencio |
| `!promover @membro` | `!promote` | Torna o membro administrador |
| `!rebaixar @membro` | `!demote` | Remove a administracao |
| `!trancar` | `!lock` | Bloqueia envio para nao-admins |
| `!destrancar` | `!unlock` | Libera envio para todos |
| `!limpar [n]` | `!clear` | Apaga as ultimas N mensagens (max 50) |

</div>

### ⚙️ Configuração (admins)

<div align="center">

| Comando | Descrição |
|:--|:--|
| `!config` / `!cfg` | Painel de configuracoes do grupo |
| `!config antilink on/off` | Liga/desliga bloqueio de links |
| `!config antiflood on/off` | Liga/desliga controle de spam |
| `!config antistatus on/off` | Liga/desliga anti-status |
| `!config boasvindas on/off` | Liga/desliga mensagem de boas-vindas |
| `!config saida on/off` | Liga/desliga mensagem de despedida |
| `!config maxavisos <n>` | Define o limite de avisos antes do ban |
| `!config floodlimite <n>` | Msgs por 10s antes de acionar o anti-flood |
| `!setboasvindas <msg>` / `reset` | Personaliza a mensagem de entrada |
| `!setsaida <msg>` / `reset` | Personaliza a mensagem de saida |
| `!setregras <texto>` | Define as regras do grupo |
| `!palavras` | Lista palavras proibidas |
| `!addpalavra <palavra>` | Adiciona palavra a lista negra |
| `!rmpalavra <palavra>` | Remove palavra da lista negra |

</div>

### 🌐 Comandos Publicos

<div align="center">

| Comando | Alias EN | Descrição |
|:--|:--|:--|
| `!regras` | `!rules` | Mostra as regras do grupo |
| `!avisos [@membro]` | `!warns` | Consulta avisos de um membro |
| `!admins` | — | Lista os administradores |
| `!info` | — | Estatisticas do grupo |
| `!ping` | — | Latencia do bot |
| `!ajuda` | `!help` | Lista todos os comandos |

</div>

---

## 🤖 Automações

<div align="center">

| Automação | Padrão | Comportamento |
|:--|:--:|:--|
| 👋 Boas-vindas | :white_check_mark: Ligado | Mensagem ao entrar no grupo |
| 🚪 Despedida | :red_circle: Desligado | Mensagem ao sair do grupo |
| 🔗 Anti-link | :red_circle: Desligado | Apaga mensagens com links |
| 💬 Anti-flood | :red_circle: Desligado | Avisa quem envia mensagens rapido demais |
| 📸 Anti-status | :red_circle: Desligado | Impede visualizacao de status automatica |
| 🤬 Palavras proibidas | :white_check_mark: Sempre ativo | Apaga mensagens com palavras da lista negra |
| 🔨 Ban automatico | :white_check_mark: Ativo | Bane ao atingir o limite de avisos (padrao: 3) |

</div>

### Personalizar mensagens

Use `{nome}` para mencionar o membro automaticamente:

```bash
!setboasvindas Bem-vindo(a) ao grupo, {nome}! Leia as !regras 📋
!setsaida Ate mais, {nome}! Foi um prazer ter voce aqui 👋
```

---

## 🔧 Solução de problemas

<details>
<summary><b>❓ QR Code nao aparece ou expirou</b></summary>

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

Certifique-se de que esta usando o **Termux do GitHub**, nao da Play Store. Reinstale se necessario.
</details>

<details>
<summary><b>❓ Node.js muito antigo (erro no npm install)</b></summary>

```bash
pkg install nodejs-lts -y
```
</details>

<details>
<summary><b>❓ Bot encerrado com a tela apagada</b></summary>

Execute `termux-wake-lock` e configure o Termux como app sem restricao de bateria:
**Configurações → Aplicativos → Termux → Bateria → Sem restrições**
</details>

---

## 🧱 Estrutura do projeto

```
mod-bot/
│
├── 📄 index.js              # Nucleo: conexao, eventos, anti-flood, anti-link
├── 📄 launcher.js           # Inicializador com keep-alive
├── 📄 config.js             # Configuracoes gerais
│
├── 📂 core/
│   ├── commandHandler.js    # Carrega e processa comandos
│   ├── database.js          # Banco SQLite (avisos, config, grupos)
│   ├── seguranca.js         # Verificacao de permissoes
│   ├── notificar.js         # Notificacoes para o dono
│   ├── buffer.js            # Buffer de mensagens para !limpar
│   └── utils.js             # Funcoes utilitarias
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

## 📦 Dependencias

<div align="center">

| Pacote | Uso |
|:--|:--|
| [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) | Conexao com WhatsApp Web |
| [`pino`](https://getpino.io) | Logger |
| [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) | QR Code no terminal |
| [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) | Banco de dados local |

</div>

---

## 📝 Licença

Distribuido sob a licenca **MIT** — use, modifique e distribua a vontade.

---

<div align="center">

Feito com 🧡 por **[Leo-Shiba](https://github.com/Leo-Shiba)**

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Leo--Shiba-1a1a1a?style=for-the-badge&logo=github&logoColor=FF6B00)](https://github.com/Leo-Shiba)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:CC4500,100:FF8C00&height=120&section=footer" width="100%"/>

</div>
