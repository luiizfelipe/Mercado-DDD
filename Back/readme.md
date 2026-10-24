# Backend — Mercado DDD

Backend do sistema de mercado, responsável pela API de produtos e pedidos, regras da aplicação, persistência e serviços de infraestrutura.

## Tecnologias

- C# e ASP.NET Core (.NET 9)
- Entity Framework Core 9
- PostgreSQL com Npgsql
- Swagger para documentação da API em desenvolvimento
- YARP para proxy reverso
- RabbitMQ configurado para integração de mensageria

## Estrutura

```text
src/
├── Api/             # Aplicação ASP.NET Core, controllers e middlewares
├── Application/     # Serviços, interfaces e DTOs
├── Domain/          # Entidades, enums e exceções de domínio
├── Infrastructure/  # DbContext, mapeamentos, repositórios e migrations
├── CrossCutting/    # Registro de serviços e dependências
├── Utils/           # Utilitários compartilhados
├── PaymentService/  # Worker de pagamentos (em desenvolvimento)
├── Mercado.sln
└── dotnet-tools.json
```

## Pré-requisitos

- .NET SDK 9
- Docker com Docker Compose

## Executar dependências

A partir da raiz do repositório:

```bash
docker compose -f Back/dockercompose.yml up -d
```

Isso inicia PostgreSQL na porta `5432` e RabbitMQ nas portas `5672` (AMQP) e `15672` (painel de gerenciamento). Credenciais padrão do ambiente local:

- PostgreSQL: usuário `postgres`, senha `postgres`, banco `market-ddd`
- RabbitMQ: usuário `user`, senha `password`

## Configurar e iniciar a API

Os comandos abaixo devem ser executados a partir da raiz do repositório.

Restaure a ferramenta Entity Framework definida no manifesto:

```bash
dotnet tool restore --tool-manifest Back/src/dotnet-tools.json
```

Aplique as migrations:

```bash
dotnet ef database update --project Back/src/Infrastructure/Infrastructure.csproj --startup-project Back/src/Api/Api.csproj
```

Inicie a API usando o perfil HTTP de desenvolvimento:

```bash
dotnet run --project Back/src/Api/Api.csproj --launch-profile http
```

A API fica disponível em `http://localhost:5043`. A interface Swagger é habilitada em desenvolvimento em `http://localhost:5043/swagger`.

## Endpoints implementados

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/products` | Lista produtos |
| `GET` | `/api/products/{id}` | Busca um produto por ID |
| `POST` | `/api/products` | Cadastra um produto |
| `POST` | `/api/products/bulk` | Endpoint de cadastro em lote |
| `PUT` | `/api/products/{id}` | Atualiza um produto |
| `GET` | `/api/orders/{id}` | Busca um pedido por ID |
| `POST` | `/api/orders` | Cria um pedido |

Os erros de domínio são convertidos em respostas HTTP pelo `ExceptionMiddleware`. Os demais erros retornam status `500`.

## Banco de dados

O contexto `MarketDatabaseContext` e os mapeamentos ficam no projeto `Infrastructure`. As migrations existentes criam/atualizam as tabelas de produtos, pedidos e itens de pedido.

A configuração local padrão está em `src/Api/appsettings.json`. Atualize a conexão `PostgresConnection` caso use outra instância. Não inclua credenciais reais no controle de versão.

## Observações sobre integrações

- O worker em `PaymentService` ainda não consome mensagens do RabbitMQ; no estado atual, executa um ciclo periódico de log.
- A configuração YARP encaminha `/api/orders/{**catch-all}` para `http://localhost:7002/`. Esse destino externo não é iniciado pelo `dockercompose.yml` deste backend.
- O Compose inicia somente PostgreSQL e RabbitMQ; a API e o worker são executados separadamente.
