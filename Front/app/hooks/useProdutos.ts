import { useCallback, useEffect, useState } from "react";
import { produtosApi } from "~/lib/http/produtosApi";
import type { CadastroProduto, Produto } from "~/types/product";

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      setProdutos(await produtosApi.listar());
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function criar(dados: CadastroProduto) {
    setSalvando(true);
    try {
      await produtosApi.criar(dados);
      await load();
    } finally {
      setSalvando(false);
    }
  }

  async function atualizar(id: string, dados: CadastroProduto) {
    setSalvando(true);
    try {
      await produtosApi.atualizar(id, dados);
      await load();
    } finally {
      setSalvando(false);
    }
  }

  async function remover(id: string) {
    setSalvando(true);
    try {
      await produtosApi.remover(id);
      await load();
    } finally {
      setSalvando(false);
    }
  }

  return {
    produtos,
    carregando,
    salvando,
    erro,
    recarregar: load,
    criar,
    atualizar,
    remover,
  };
}
