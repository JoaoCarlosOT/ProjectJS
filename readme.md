<h1 align="center" style="font-weight: bold;">Project name 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>Simple description of what your project do or how to use it</b>
</p>

<p align="center">
     <a href="PROJECT__URL">📱 Visit this Project</a>
</p>

<h2 id="layout">🎨 Layout</h2>

<p align="center">
    <img src="../.github/example.png" alt="Image Example" width="400px">
    <img src="../.github/example.png" alt="Image Example" width="400px">
</p>

## 🏗️ Arquitetura

O projeto está organizado em um monorepo com as seguintes aplicações:

### Apps
- **`backoffice-api`** - API administrativa (Elysia.js + Drizzle ORM)
- **`customer-api`** - API para clientes (NestJS + Prisma)

## 📋 Pré-requisitos

- **Node.js** >= 22
- **pnpm** >= 9.0.0
- **Docker** e **Docker Compose**
- **Git**

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd betzou
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

#### Setup automático (Recomendado)
```bash
# Na raiz do projeto
pnpm setup:env
```

Este comando irá copiar os arquivos `.env.example` para `.env` em todas as aplicações.

#### Setup manual
Se preferir configurar manualmente, crie arquivos `.env` em cada aplicação:

**Backoffice API:**
```bash
cd apps/backoffice-api
cp .env.example .env
```

**Customer API:**
```bash
cd apps/customer-api
cp .env.example .env
```

### 4. Inicie os serviços de infraestrutura

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso irá iniciar:
- **PostgreSQL** na porta 5432
- **Redis** na porta 6379
- **MongoDB** na porta 27017

### 5. Configure o banco de dados

#### Para Customer API (Prisma)
```bash
cd apps/customer-api
pnpm migrate:up
pnpm migrate:generate
```

### 6. Execute as aplicações

#### Desenvolvimento (todas as apps)
```bash
# Na raiz do projeto
pnpm dev
```

#### Desenvolvimento individual

**Backoffice API:**
```bash
pnpm dev --filter=@betzou/backoffice-api
```

**Customer API:**
```bash
pnpm dev --filter=@betzou/customer-api
```


## 🛠️ Scripts disponíveis

### Scripts globais (raiz do projeto)
```bash
pnpm dev          # Inicia todas as aplicações em modo desenvolvimento
pnpm build        # Build de todas as aplicações
pnpm lint         # Executa linting em todas as aplicações
pnpm lint:fix     # Corrige problemas de linting automaticamente
pnpm setup:env    # Copia arquivos .env.example para .env
```

### Scripts específicos por aplicação

#### Customer API
```bash
cd apps/customer-api
pnpm dev          # Desenvolvimento com hot reload
pnpm build        # Build para produção
pnpm start        # Inicia em modo produção
pnpm migrate:up   # Executa migrations do Prisma
pnpm migrate:generate # Gera novas migrations
```

## 🗄️ Bancos de dados

### PostgreSQL (Customer API)
- **Host:** localhost:5432
- **User:** postgres
- **Password:** docker
- **Database:** sortee

#### Serviços Disponíveis

- **Grafana** (porta 9999): Interface web para visualização
- **Prometheus** (porta 9090): Coleta de métricas
```

## 🔧 Ferramentas de desenvolvimento

### ESLint
Configuração compartilhada com regras para:
- Double quotes para strings
- Semicolons no final das statements
- Espaço antes de brackets
- Sem espaço antes de parênteses em funções

### TypeScript
Configurações compartilhadas para todas as aplicações.

### Prettier
Formatação automática do código.

## 📁 Estrutura do projeto

```
betzou/
├── apps/
│   ├── backoffice-api/     # API administrativa
│   ├── customer-api/       # API para clientes
│   ├── games-api/         # API de jogos
│   └── web-backoffice/    # Interface administrativa
├── packages/
│   ├── eslint-config/     # Configurações ESLint
│   └── tsconfig/          # Configurações TypeScript
├── monitoring/            # Stack de observabilidade
├── docker-compose.yml     # Serviços de infraestrutura
└── package.json          # Configuração do monorepo
```

## 🧪 Testes

### Customer API
```bash
cd apps/customer-api
pnpm test              # Executa todos os testes
pnpm test:watch        # Executa testes em modo watch
pnpm test:e2e          # Executa testes end-to-end
```

## 📝 Migrations

### Customer API (Prisma)
```bash
cd apps/customer-api
pnpm migrate:generate  # Gera nova migration
pnpm migrate:up        # Executa migrations pendentes
```

## 🚀 Deploy

### Build para produção
```bash
pnpm build
```

### Executar em produção
```bash
# Backoffice API
cd apps/backoffice-api
pnpm start

# Customer API
cd apps/customer-api
pnpm start:prod

# Games API
cd apps/games-api
pnpm start
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e não possui licença pública.

## 🆘 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
