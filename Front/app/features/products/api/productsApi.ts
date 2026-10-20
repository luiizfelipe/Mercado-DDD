import { apiClient } from "~/lib/http/apiClient";
import type { Product, ProductRequest } from "../types";

const BASE_PATH = "/products";

export const productsApi = {
  list: () => apiClient.get<Product[]>(BASE_PATH),

  getById: (id: number) =>
    apiClient.get<Product>(`${BASE_PATH}/${id}`),

  create: (data: ProductRequest) =>
    apiClient.post<Product>(BASE_PATH, data),

  update: (id: number, data: ProductRequest) =>
    apiClient.put<Product>(`${BASE_PATH}/${id}`, data),

  remove: (id: number) =>
    apiClient.delete(`${BASE_PATH}/${id}`),
};
