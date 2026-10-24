export type Produto = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  active: boolean;
};

export type CadastroProduto = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  active: boolean;
};
