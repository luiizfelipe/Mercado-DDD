# 🛒 Projeto Mercado – Sistema de Gestão de Vendas

Um sistema completo de mercado desenvolvido para gerenciar produtos, usuários e vendas de forma simples, eficiente e segura.  
O projeto tem como objetivo evoluir gradualmente, começando com a base CRUD e avançando para funcionalidades completas de um sistema comercial moderno.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** C# (.NET 8 / ASP.NET Core)  
- **Banco de Dados:** PostgreSQL (configurável)  
- **ORM:** Entity Framework Core  
- **Frontend (futuro):** Angular  
- **Autenticação:** JWT + Níveis de Acesso  
- **Outros:** Docker, Swagger, AutoMapper

---

## 🧩 Estrutura de Desenvolvimento

O projeto é dividido em etapas (tasks) organizadas para facilitar o crescimento modular da aplicação.

### 🧱 Etapa 1 – CRUD de Produtos
**Objetivo:** Implementar o gerenciamento completo de produtos.  
**Funcionalidades:**
- Cadastrar novo produto (nome, descrição, preço, estoque)
- Listar todos os produtos
- Editar produto existente
- Excluir produto
- Buscar produto por ID ou nome

---

### 👥 Etapa 2 – CRUD de Usuários
**Objetivo:** Criar o sistema de gerenciamento de usuários do sistema.  
**Funcionalidades:**
- Cadastro de novos usuários
- Edição de dados pessoais
- Exclusão de contas
- Listagem de usuários
- Autenticação básica com senha criptografada (hash + salt)

---

### 🔐 Etapa 3 – Níveis de Acesso
**Objetivo:** Implementar perfis e permissões dentro do sistema.  
**Papéis esperados:**
- **Administrador:** acesso total a todos os módulos  
- **Funcionário:** pode gerenciar produtos e pedidos, mas não usuários  
- **Cliente:** pode apenas visualizar produtos e fazer compras  

---

### ⚙️ Etapa 4 – Controle de Autenticação e Sessão
**Objetivo:** Criar o sistema de login com controle de sessão.  
**Funcionalidades:**
- Login com token JWT  
- Middleware de autenticação  
- Proteção de rotas conforme o nível de acesso  
- Logout e refresh de token  

---

### 🛍️ Etapa 5 – Módulo de Carrinho e Pedidos
**Objetivo:** Implementar o fluxo de compra.  
**Funcionalidades:**
- Adicionar e remover produtos do carrinho  
- Finalizar pedido  
- Histórico de compras por usuário  
- Atualização automática de estoque  

---

### 📊 Etapa 6 – Relatórios e Dashboard
**Objetivo:** Gerar relatórios administrativos.  
**Funcionalidades:**
- Relatório de vendas diárias, semanais e mensais  
- Produtos mais vendidos  
- Gráficos de desempenho (frontend com React + Chart.js / Recharts)  

---

## 🧰 Como Executar o Projeto

### Pré-requisitos
- .NET SDK instalado  
- Banco de dados configurado (PostgreSQL)
- Ferramentas de migração (`dotnet ef`)  
- Docker

### Passos
```bash
# Clonar o repositório
git clone https://github.com/luiizfelipe/Mercado-DDD.git
cd Mercado-DDD/src
dotnet ef database update -p Infrastructure -s Api


