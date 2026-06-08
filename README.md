<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=25D366&height=200&section=header&text=Mod-Bot&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Bot%20de%20Modera%C3%A7%C3%A3o%20para%20WhatsApp&descAlignY=60&descSize=22&descColor=ffffff" width="100%"/>

<br/>

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://github.com/Leo-Shiba/mod-bot)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Baileys](https://img.shields.io/badge/Baileys-6.7.9-0078D4?style=for-the-badge)](https://github.com/WhiskeySockets/Baileys)
[![Termux](https://img.shields.io/badge/Termux-Android-black?style=for-the-badge&logo=android&logoColor=white)](https://f-droid.org)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow?style=for-the-badge)](./LICENSE)

<br/>

> **Bot completo de moderação de grupos WhatsApp, feito para rodar direto no celular via Termux.**  
> Sem servidor. Sem mensalidade. Instala em minutos e funciona 24h no seu Android.

<br/>

[📥 Instalação](#-instalação-no-celular-android) · [⚙️ Comandos](#️-comandos) · [🤖 Automações](#-automações) · [📄 Tutoriais PDF](#-tutoriais-em-pdf) · [🔧 Problemas](#-solução-de-problemas)

</div>

---

## ✨ O que o bot faz

<table>
<tr>
<td width="50%">

**🛡️ Moderação**
- 🔨 Banir, promover e rebaixar membros
- ⚠️ Sistema de avisos com ban automático
- 🔇 Silenciar temporariamente

</td>
<td width="50%">

**🤖 Automações**
- 🚫 Anti-link — apaga links automaticamente
- 💬 Anti-flood — controle de spam
- 🤬 Palavras proibidas com lista negra

</td>
</tr>
<tr>
<td width="50%">

**👥 Gestão de Grupo**
- 👋 Boas-vindas e despedida personalizáveis
- 📜 Regras acessíveis por qualquer membro
- 🧹 Limpeza de mensagens em massa

</td>
<td width="50%">

**📊 Informações**
- 📊 Estatísticas do grupo com `!info`
- 👮 Lista de admins com `!admins`
- ⚠️ Histórico de avisos por membro

</td>
</tr>
</table>

---

## 📄 Tutoriais em PDF

Dois guias prontos para compartilhar com quem quiser instalar o bot:

| 📁 Arquivo | 📋 Conteúdo |
|:--|:--|
| [`tutorial-instalacao.pdf`](./tutorial-instalacao.pdf) | Passo a passo completo de instalação no Termux |
| [`referencia-comandos.pdf`](./referencia-comandos.pdf) | Referência rápida de todos os comandos |

---

## 📲 Instalação no celular (Android)

### Pré-requisitos

| ✅ | Requisito |
|:--:|:--|
| 📱 | Android 7.0 ou superior |
| 📦 | App **Termux** (via F-Droid — veja abaixo) |
| 📂 | Pasta do bot no celular |

---

### Passo 1 — Instalar o Termux

> [!WARNING]
> **Não use a Play Store** — a versão de lá é antiga e quebra a instalação.

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

O script faz **tudo automaticamente**:

| ⚙️ | Etapa |
|:--:|:--|
| 📦 | Instala o Node.js e as dependências |
| 📱 | Pede seu número de WhatsApp |
| 🚀 | Pergunta se quer iniciar o bot agora |
| 🌙 | Pergunta se quer rodar em segundo plano |

---

### Passo 4 — Escanear o QR Code

Quando o bot iniciar, um QR Code aparecerá no terminal. Escaneie pelo WhatsApp:

```
WhatsApp → Menu (⋮) → Aparelhos conectados → Conectar aparelho
```

> [!TIP]
> ✅ Pronto — o bot está online!

---

### 🌙 Manter o bot ligado com a tela apagada

O setup já pergunta sobre isso. Para configurar manualmente:

1. **Configurações → Aplicativos → Termux → Bateria** → Selecione **Sem restrições**
2. No painel de notificações, segure a notificação do Termux → marque como **Persistente**

---

### 🔁 Religar o bot depois

```bash
cd ~/mod-bot && npm start
```

---

## ⚙️ Comandos

> Todos começam com `!`. Admins têm acesso a tudo; membros comuns só aos comandos públicos.

### 🔐 Comandos de Administrador

| Comando | Descrição |
|:--|:--|
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

| Comando | Descrição |
|:--|:--|
| `!regras` | Mostra as regras do grupo |
| `!avisos [@membro]` | Mostra quantos avisos alguém tem |
| `!admins` | Lista os administradores |
| `!info` | Estatísticas do grupo |
| `!ajuda` | Lista todos os comandos disponíveis |

---

## 🤖 Automações

| Automação | Status padrão | Comportamento |
|:--|:--:|:--|
| 👋 Boas-vindas | ✅ Ligado | Manda mensagem quando alguém entra |
| 👋 Despedida | ⛔ Desligado | Manda mensagem quando alguém sai |
| 🤬 Palavras proibidas | ✅ Sempre ativo | Apaga mensagens da lista negra |
| 🔗 Anti-link | ⛔ Desligado | Apaga mensagens com links |
| 💬 Anti-flood | ⛔ Desligado | Avisa quem manda mensagens rápido demais |
| 🔨 Ban automático | ✅ Ativo | Bane após atingir o limite de avisos (padrão: 3) |

### Personalizar mensagens

Use `{nome}` para mencionar o membro automaticamente:

```bash
!setboasvindas Olá, {nome}! Seja bem-vindo(a). Leia as regras com !regras.
!setsaida Até mais, {nome}! Foi bom ter você aqui.
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
npm start
```

O bot reconecta automaticamente na maioria dos casos.
</details>

<details>
<summary><b>❓ Erro de permissão ao copiar arquivos</b></summary>

```bash
termux-setup-storage
```

Aceite a permissão e tente novamente.
</details>

<details>
<summary><b>❓ Node.js muito antigo (erro no setup)</b></summary>

```bash
pkg install nodejs-lts -y
```
</details>

---

## 🧱 Estrutura do projeto

```
mod-bot/
│
├── 📄 index.js              # Núcleo: conexão, eventos, anti-flood, anti-link
├── 📄 launcher.js           # Inicializador com keep-alive
├── 📄 config.js             # Configurações gerais
├── 📜 setup-termux.sh       # Script de instalação automática
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
├── 📋 tutorial-instalacao.pdf
└── 📋 referencia-comandos.pdf
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
