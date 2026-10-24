import { apiClient } from "~/lib/http/apiClient";
import type { CriarPedidoRequest, Pedido } from "~/types/order";

const BASE_PATH = "/orders";

export const pedidosApi = {
  criar: (dados: CriarPedidoRequest) =>
    apiClient.post<Pedido>(BASE_PATH, {
      items: dados.itens.map((item) => ({
        productId: item.produtoId,
        quantity: item.quantidade,
      })),
    }),
};
