import { useCallback, useEffect, useState } from "react";
import { productsApi } from "../api/productsApi";
import type { Product, ProductRequest } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setProducts(await productsApi.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function create(data: ProductRequest) {
    setSaving(true);
    try {
      await productsApi.create(data);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function update(id: number, data: ProductRequest) {
    setSaving(true);
    try {
      await productsApi.update(id, data);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    setSaving(true);
    try {
      await productsApi.remove(id);
      await load();
    } finally {
      setSaving(false);
    }
  }

  return {
    products,
    loading,
    saving,
    error,
    reload: load,
    create,
    update,
    remove,
  };
}
