export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  active: boolean;
};

export type ProductRequest = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  active: boolean;
};
