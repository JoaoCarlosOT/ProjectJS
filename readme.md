
<h1 align="center" style="font-weight: bold;">📝 Task Manager App</h1>  

<p align="center">  
  <a href="#tech">Tecnologias</a> •   
  <a href="#start">Como rodar</a> •   
  <a href="#structure">Arquitetura</a> •  
  <a href="#contrib">Contribuindo</a> 
</p>  

<p align="center"><b>Gerencie suas tarefas com organização, filtros e favoritos.</b></p>  

<p align="center">     
  <a href="http://localhost:5173">📱 Acesse o projeto</a> 
</p>

---

## 🎨 Layout

<p align="center">     
  <img src="./.github/home.png" alt="Tela Home" width="400px">  
  <img src="./.github/login.png" alt="Tela Login" width="400px"> 
</p>

---

## 🏗️ Arquitetura <a id="structure"></a>

O projeto é dividido em duas partes:

### 📦 Aplicações

* **`client/`** – Frontend em React + Vite + Tailwind
* **`server/`** – Backend em Node.js + Express + PostgreSQL

---

## 📋 Pré-requisitos

* **Node.js** >= 18
* **Docker** e **Docker Compose**
* **Git**

---

## 🚀 Como rodar o projeto <a id="start"></a>

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd task-manager
```

### 2. Suba os serviços com Docker

```bash
docker-compose up -d
```

> Isso iniciará o PostgreSQL e deixará o banco acessível na porta `5432`.

### 3. Configure o backend

```bash
cd server
cp .env.example .env
npm install
npm run migrate       # Executa as migrations no banco
npm run dev           # Inicia o servidor backend (porta 3000)
```

### 4. Configure o frontend

```bash
cd client
npm install
npm run dev           # Inicia o app React (porta 5173)
```

---

## 💻 Tecnologias utilizadas <a id="tech"></a>

### 🖥️ Frontend

* React
* Vite
* TailwindCSS
* React Router DOM
* Axios
* Context API

### 🛠️ Backend

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JWT (autenticação)

### 🐳 Infra

* Docker
* Docker Compose

---

## 📁 Estrutura do Projeto

```
task-manager/
├── client/              # Aplicação Frontend
├── server/              # API Backend
├── docker-compose.yml   # Configuração de banco de dados
└── README.md
```

---

## 🔐 Funcionalidades

* Login e Registro de usuários
* Cadastro, edição e exclusão de tarefas
* Filtro por status (A fazer, Em progresso, Finalizado)
* Marcar/desmarcar favoritos
* Mensagens de feedback (Flash messages)
* Responsividade total

---

## 🤝 Contribuindo <a id="contrib"></a>

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça commit das alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push na branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📝 Licença

Este projeto é **privado** e não possui uma licença pública.

---

