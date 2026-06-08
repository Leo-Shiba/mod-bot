# 🛡️ Mod Bot

Bot de moderação para grupos do WhatsApp, feito para rodar 100% pelo celular via **Termux** — sem servidor, sem VPS.

## Funcionalidades

- **Anti-link** — apaga mensagens com links automaticamente
- **Anti-flood** — detecta e pune spam de mensagens
- **Palavras proibidas** — remove mensagens com palavras configuráveis
- **Silenciar membros** — impede que um membro envie mensagens por X minutos
- **Sistema de avisos** — acumula avisos com histórico de motivos e bane automaticamente ao atingir o limite
- **Boas-vindas e saída** — mensagens automáticas personalizáveis
- **Trancar/destrancar grupo** — restringe envio apenas para admins
- **Limpar mensagens** — apaga as últimas N mensagens do grupo
- **Respostas no PV** — comandos de admin respondem no privado, sem poluir o grupo
- **Configuração por grupo** — cada grupo tem suas próprias configurações
- **Banco de dados local** — SQLite via sql.js, sem dependência externa

## Requisitos

- Android com [Termux](https://termux.dev)
- Node.js >= 22 (`pkg install nodejs`)
- Git (`pkg install git`)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/Leo-Shiba/mod-bot.git
cd mod-bot

# Instale as dependências
npm install
```

## Primeiro uso

```bash
npm start
```

Na primeira execução, o bot exibe um QR Code no terminal. Escaneie pelo WhatsApp:
**Configurações → Aparelhos conectados → Conectar aparelho**

## Comandos

Todos os comandos usam o prefixo `!`. Comandos de admin reagem no grupo e enviam a resposta no seu PV.

### Públicos (qualquer membro)
| Comando | Descrição |
|---|---|
| `!regras` | Mostra as regras do grupo |

### Admins
| Comando | Descrição |
|---|---|
| `!ajuda` | Lista todos os comandos |
| `!ping` | Verifica latência do bot |
| `!info` | Status e informações do grupo |
| `!admins` | Lista os admins do grupo |
| `!avisos [@membro]` | Ver avisos e histórico de motivos |
| `!banir @membro` | Remove o membro do grupo |
| `!avisar @membro [motivo]` | Adiciona um aviso ao membro |
| `!resetar @membro` | Zera os avisos do membro |
| `!silenciar @membro [min]` | Silencia por X minutos (padrão: 30) |
| `!dessilenciar @membro` | Remove silêncio |
| `!promover @membro` | Promove a admin |
| `!rebaixar @membro` | Remove admin |
| `!trancar` | Bloqueia envio para não-admins |
| `!destrancar` | Libera envio para todos |
| `!limpar [n]` | Apaga as últimas N mensagens (padrão: 10) |
| `!config` | Painel de configurações do grupo |
| `!config antilink on/off` | Ativa/desativa anti-link |
| `!config antiflood on/off` | Ativa/desativa anti-flood |
| `!config maxavisos <n>` | Define limite de avisos antes do ban |
| `!config floodlimite <n>` | Define limite de mensagens por 10s |
| `!setregras <texto>` | Define as regras do grupo |
| `!setboasvindas <msg>` | Mensagem de boas-vindas (`{nome}` = menção) |
| `!setsaida <msg>` | Mensagem de saída (`{nome}` = menção) |
| `!palavras` | Lista palavras proibidas |
| `!addpalavra <palavra>` | Adiciona palavra proibida |
| `!rmpalavra <palavra>` | Remove palavra proibida |

## Configuração

O arquivo `.env` é opcional. Copie `.env.example` se quiser personalizar:

```bash
cp .env.example .env
```

## Estrutura

```
mod-bot/
├── index.js          # Ponto de entrada
├── launcher.js       # Auto-reinício em caso de erro
├── config.js         # Configurações globais
├── core/
│   ├── database.js   # Banco de dados SQLite
│   ├── commandHandler.js
│   ├── seguranca.js  # Rate limiting
│   ├── notificar.js
│   ├── buffer.js     # Buffer de mensagens
│   └── utils.js
├── commands/         # Um arquivo por comando
├── data/
│   ├── auth/         # Sessão WhatsApp (gitignored)
│   └── bot.db        # Banco de dados (gitignored)
└── test_bot.js       # Testes automatizados
```

## Testes

```bash
npm test
```

## Licença

MIT
