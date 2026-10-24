# Mercado

Aplicação web em React Router, TypeScript e Chakra UI para organizar produtos e pedidos.

## Estrutura

- `app/components/`: componentes de interface
- `app/config/`: configuração da aplicação
- `app/hooks/`: hooks React
- `app/lib/http/`: cliente HTTP e chamadas à API
- `app/routes/`: páginas da aplicação
- `app/types/`: tipos TypeScript

## API

Configure a URL base no arquivo `.env`:

`VITE_API_URL=http://localhost:5000/api`

As chamadas HTTP ficam centralizadas em `app/lib/http/`.

A página inicial é `/`, o catálogo é `/produtos` e a criação de pedidos é `/pedidos/novo`.
