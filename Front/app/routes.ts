import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("produtos", "routes/produtos.tsx"),
  route("pedidos/novo", "routes/novo-pedido.tsx"),
] satisfies RouteConfig;

