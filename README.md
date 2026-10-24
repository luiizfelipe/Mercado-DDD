# Mercado DDD

Aplicação web para gerenciamento de produtos e criação de pedidos. O repositório reúne o frontend, a API e os projetos de domínio e infraestrutura do backend.

## Funcionalidades disponíveis

- Consultar, cadastrar e editar produtos.
- Criar pedidos selecionando produtos e quantidades.
- Persistir produtos e pedidos em PostgreSQL usando Entity Framework Core.
- Expor endpoints REST em ASP.NET Core.

O frontend possui as páginas inicial, de produtos e de novo pedido. O backend também inclui um serviço de pagamento em desenvolvimento; atualmente, seu worker apenas executa um ciclo periódico de log.

## Tecnologias

- **Frontend:** React 19, TypeScript, React Router, Vite e Chakra UI.
- **Backend:** C# e ASP.NET Core sobre .NET 9.
- **Persistência:** PostgreSQL e Entity Framework Core.
- **Mensageria:** RabbitMQ (configurado; integração do worker ainda em desenvolvimento).
- **Proxy:** YARP, configurado para encaminhar rotas de pedidos ao serviço em `http://localhost:7002/`.

## Estrutura do repositório

```text
Mercado-DDD/
├── .git/
├── Back/
│   ├── dockercompose.yml
│   └── src/
│       ├── Api/             # API HTTP, controllers e middlewares
│       ├── Application/     # Serviços, interfaces e DTOs
│       ├── Domain/          # Entidades, regras e exceções de domínio
│       ├── Infrastructure/  # PostgreSQL, Entity Framework e migrations
│       ├── CrossCutting/    # Registro de dependências
│       ├── PaymentService/  # Worker de processamento de pagamento
│       └── Mercado.sln
└── Front/                   # Aplicação web React
```

> Os nomes reais das pastas no repositório são `Back` e `Front` (com iniciais maiúsculas).

## Pré-requisitos

- Git
- Docker com Docker Compose
- .NET SDK 9
- Node.js 24 ou compatível com as dependências do frontend
- npm

## Como executar

### 1. Inicie PostgreSQL e RabbitMQ

Na raiz do repositório:

```bash
docker compose -f Back/dockercompose.yml up -d
```

O Compose disponibiliza PostgreSQL na porta `5432` e RabbitMQ nas portas `5672` (AMQP) e `15672` (painel de gerenciamento). As credenciais padrão configuradas são `postgres/postgres` para o banco e `user/password` para o RabbitMQ.

### 2. Aplique as migrations do banco

Na raiz do repositório:

```bash
dotnet tool restore --tool-manifest Back/src/dotnet-tools.json
dotnet ef database update --project Back/src/Infrastructure/Infrastructure.csproj --startup-project Back/src/Api/Api.csproj
```

A string de conexão padrão da API aponta para `localhost:5432`, banco `market-ddd`, usuário `postgres` e senha `postgres`. Ajuste `Back/src/Api/appsettings.json` ou use configuração externa se suas credenciais forem diferentes.

### 3. Execute a API

```bash
dotnet run --project Back/src/Api/Api.csproj --launch-profile http
```

O perfil HTTP está configurado em `http://localhost:5043`. Em ambiente de desenvolvimento, a documentação Swagger fica disponível em `http://localhost:5043/swagger`.

### 4. Execute o frontend

Em outro terminal:

```bash
cd Front
npm ci
```

Crie `Front/.env` com a URL da API:

```env
VITE_API_URL=http://localhost:5043/api
```

Depois inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O endereço local do Vite normalmente é `http://localhost:5173`. A API habilita CORS para essa origem. A variável `VITE_API_URL` pode ser alterada para apontar a outro endereço.

## Rotas da aplicação

### Frontend

| Caminho | Página |
| --- | --- |
| `/` | Página inicial |
| `/produtos` | Listagem, cadastro e edição de produtos |
| `/pedidos/novo` | Criação de um pedido |

### API

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/products` | Lista produtos |
| `GET` | `/api/products/{id}` | Busca produto pelo identificador |
| `POST` | `/api/products` | Cadastra um produto |
| `POST` | `/api/products/bulk` | Endpoint de cadastro em lote |
| `PUT` | `/api/products/{id}` | Atualiza um produto |
| `GET` | `/api/orders/{id}` | Busca pedido pelo identificador |
| `POST` | `/api/orders` | Cria pedido |

O frontend envia os itens do pedido com `productId` e `quantity`. Os endpoints e o comportamento efetivo devem ser conferidos no backend ao evoluir a aplicação.

## Comandos úteis

Dentro da pasta `Front`:

```bash
npm run typecheck  # Gera os tipos do React Router e verifica TypeScript
npm run build      # Gera o build de produção
npm run start      # Serve o build de produção
```

## Configuração e observações

- A URL padrão da API no frontend é `http://localhost:5000/api`; para o perfil HTTP atual do backend (`5043`), configure `VITE_API_URL` conforme o exemplo acima.
- A conexão PostgreSQL e as configurações do RabbitMQ estão em `Back/src/Api/appsettings.json`. Evite versionar credenciais reais; use variáveis de ambiente ou configuração local para ambientes compartilhados.
- O serviço de pagamento é um esqueleto e ainda não consome mensagens do RabbitMQ.
- O proxy YARP possui um destino de pedidos em `localhost:7002`; esse serviço separado não é iniciado pelo Compose deste repositório.
- O Compose inicializa o banco e o broker, mas não aplica migrations automaticamente nem inicia API e frontend.
