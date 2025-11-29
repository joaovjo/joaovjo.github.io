# João Vitor de Jesus Oliveira - Personal Website

<div align="center">

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=for-the-badge&logo=alpine.js&logoColor=black)

🌐 [joaovjo.com.br](https://joaovjo.com.br)

</div>

## 📝 Sobre

Site pessoal e currículo online com suporte a múltiplos idiomas (Português e Inglês), tema claro/escuro e impressão otimizada em PDF. Construído com tecnologias modernas e foco em performance e acessibilidade.

## ✨ Funcionalidades

- 🌍 **Internacionalização (i18n)** - Suporte para Português (BR) e Inglês
- 🌙 **Dark Mode** - Alternância entre tema claro e escuro com persistência
- 🖨️ **Impressão PDF** - Layout otimizado para impressão via `Ctrl+P`
- 📱 **Responsivo** - Layout adaptável para todos os tamanhos de tela
- ⚡ **Performance** - Build otimizado com Bun e Tailwind CSS
- ♿ **Acessibilidade** - Semântica HTML correta e suporte a leitores de tela
- 🔍 **SEO** - Meta tags, Open Graph e Schema.org implementados
- 🧹 **Linting** - Biome para formatação e análise de código

## 🛠️ Tecnologias

- **Runtime/Server:** [Bun](https://bun.sh/) (v1.2.3+ com routes API)
- **Bundler:** Bun HTML bundler (bundling nativo de HTML, JS, CSS)
- **Linguagem:** TypeScript
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Reatividade:** [Alpine.js](https://alpinejs.dev/)
- **Linter/Formatter:** [Biome](https://biomejs.dev/)
- **Dados:** YAML (suporte nativo do Bun)

## 🚀 Recursos Fullstack do Bun

Este projeto utiliza recursos modernos do Bun:

- **📦 HTML Imports:** Importação de arquivos HTML como módulos
- **🔄 YAML Imports:** Carregamento nativo de arquivos YAML
- **🌐 HTTP Server:** `Bun.serve()` com API de rotas
- **🔥 Hot Reload:** Atualização automática em desenvolvimento
- **📄 Static Bundling:** Geração de site estático para GitHub Pages

## 📁 Estrutura do Projeto

```
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions para deploy
├── data/                    # Dados do currículo em YAML
│   ├── en/                  # Dados em Inglês
│   │   ├── education.yaml
│   │   ├── experience.yaml
│   │   ├── profile.yaml
│   │   ├── skills.yaml
│   │   └── ui.yaml
│   └── pt-BR/               # Dados em Português
│       ├── education.yaml
│       ├── experience.yaml
│       ├── profile.yaml
│       ├── skills.yaml
│       └── ui.yaml
├── src/                     # Código fonte
│   ├── server.ts            # Servidor HTTP Bun (dev mode)
│   ├── index.ts             # Lógica Alpine.js + imports
│   ├── global.css           # Estilos Tailwind CSS v4
│   ├── pages/               # Páginas HTML
│   │   ├── index.html       # Página PT-BR
│   │   └── en/
│   │       └── index.html   # Página EN
│   └── types/               # Definições de tipos TypeScript
│       └── types.d.ts
├── biome.json               # Configuração do linter
├── bunfig.toml              # Configuração do Bun
├── tsconfig.json            # Configuração TypeScript
└── package.json
```

## 🚀 Começando

### Pré-requisitos

- [Bun](https://bun.sh/) (v1.0+)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/joaovjo/joaovjo.github.io.git
cd joaovjo.github.io

# Instale as dependências
bun install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento com hot reload
bun run dev
```

O site estará disponível em:

- **Português:** `http://localhost:3000/`
- **Inglês:** `http://localhost:3000/en/`
- **Health Check:** `http://localhost:3000/api/health`

### Scripts Disponíveis

```bash
bun run dev          # Servidor de desenvolvimento com hot reload
bun run start        # Servidor de produção
bun run build        # Build completo (server + static)
bun run build:static # Build apenas site estático
bun run build:server # Build apenas servidor
bun run lint         # Verificar código com Biome
bun run lint:fix     # Corrigir problemas automaticamente
bun run typecheck    # Verificar tipos TypeScript
```

### Build

```bash
# Gera o build de produção
bun run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🎨 Personalização

### Dados do Currículo

Os dados do currículo são armazenados em arquivos YAML na pasta `data/`. Para personalizar:

1. Edite os arquivos em `data/pt-BR/` para Português
2. Edite os arquivos em `data/en/` para Inglês

### Temas

O projeto usa variáveis CSS para tematização. Os temas claro e escuro são gerenciados via Tailwind CSS.

## 🌐 Deploy

O site é hospedado no GitHub Pages e configurado para o domínio personalizado `joaovjo.com.br`.

### Deploy Automático

O deploy é feito automaticamente via GitHub Actions quando há push no branch `main`:

1. Instala dependências com Bun
2. Compila TypeScript e processa Tailwind CSS
3. Gera arquivos estáticos na pasta `dist/`
4. Faz deploy no GitHub Pages

### Deploy Manual

```bash
# Gera o build de produção
bun run build
```

Os arquivos serão gerados em `dist/`.

## 📜 Licença

Este projeto é de uso pessoal. Sinta-se à vontade para usar como inspiração para seu próprio portfólio.

## 📧 Contato

- **Email:** contato@joaovjo.com.br
- **LinkedIn:** [joaovitordejesusoliveira](https://www.linkedin.com/in/joaovitordejesusoliveira)
- **GitHub:** [@joaovjo](https://github.com/joaovjo)

---

<div align="center">
  Feito com ❤️ por João Vitor
</div>
