import { apiClient } from "~/lib/http/apiClient";
import type { CadastroProduto, Produto } from "~/types/product";

const BASE_PATH = "/products";

export const produtosApi = {
  listar: () => apiClient.get<Produto[]>(BASE_PATH),

  buscarPorId: (id: string) =>
    apiClient.get<Produto>(`${BASE_PATH}/${id}`),

  criar: (dados: CadastroProduto) =>
    apiClient.post<Produto>(BASE_PATH, dados),

  atualizar: (id: string, dados: CadastroProduto) =>
    apiClient.put<Produto>(`${BASE_PATH}/${id}`, dados),

  remover: (id: string) =>
    apiClient.delete(`${BASE_PATH}/${id}`),
};
