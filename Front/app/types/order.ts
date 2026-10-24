export type ItemPedidoRequest = {
  produtoId: string;
  quantidade: number;
};

export type CriarPedidoRequest = {
  itens: ItemPedidoRequest[];
};

export type ItemPedido = ItemPedidoRequest & {
  id: string;
  pedidoId: string;
  precoUnitario: number;
};

export type Pedido = {
  id: string;
  status: number | string;
  itens: ItemPedido[];
};
