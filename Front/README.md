# Mercado Frontend

Frontend base em React Router + TypeScript + Chakra UI, preparado para crescer em módulos.

## Estrutura

- `app/`
  - `components/`: componentes reutilizáveis
  - `config/`: configuração da aplicação
  - `features/`: módulos por domínio
  - `hooks/`: hooks compartilhados
  - `layouts/`: layouts
  - `lib/`: infraestrutura HTTP
  - `routes/`: páginas/rotas
  - `types/`: tipos globais
  - `root.tsx`: shell da aplicação
  - `app.css`: estilos globais

## API

A URL base é definida em `.env`:

`VITE_API_URL=http://localhost:5000/api`

O módulo de produtos usa:

- `GET /api/produtos`
- `GET /api/produtos/{id}`
- `POST /api/produtos`
- `PUT /api/produtos/{id}`
- `DELETE /api/produtos/{id}`

Os endpoints estão centralizados em `app/features/products/api/productsApi.ts`.

## Como usar

Copie os arquivos para o seu projeto React Router existente.

Instale Chakra UI caso ainda não esteja instalado:

`npm install @chakra-ui/react @emotion/react`

Depois configure `.env` com a URL da sua API.

A tela inicial é `/produtos`.
