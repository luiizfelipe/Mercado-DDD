import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";

import type { Product, ProductRequest } from "../types";

type Props = {
  product?: Product | null;
  loading?: boolean;
  onSubmit: (data: ProductRequest) => Promise<void>;
  onCancel: () => void;
};

const emptyForm: ProductRequest = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  active: true,
};

export function ProductForm({
  product,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<ProductRequest>(emptyForm);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        stock: product.stock,
        active: product.active,
      });
    } else {
      setForm({ ...emptyForm });
    }
  }, [product]);

  function update<K extends keyof ProductRequest>(
    field: K,
    value: ProductRequest[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    await onSubmit(form);
  }

  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel>Nome</FormLabel>

        <Input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Ex.: Arroz 5kg"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Descrição</FormLabel>

        <Textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Descrição do produto"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Preço</FormLabel>

        <NumberInput
          min={0}
          value={String(form.price)}
          onChange={(_, valueAsNumber) =>
            update(
              "price",
              Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
            )
          }
        >
          <NumberInputField placeholder="0,00" />
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Estoque</FormLabel>

        <NumberInput
          min={0}
          value={String(form.stock)}
          onChange={(_, valueAsNumber) =>
            update(
              "stock",
              Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
            )
          }
        >
          <NumberInputField placeholder="0" />
        </NumberInput>
      </FormControl>

      <Switch
        isChecked={form.active}
        onChange={(e) => update("active", e.target.checked)}
      >
        Produto ativo
      </Switch>

      <Stack direction="row" justify="flex-end">
        <Button
          variant="outline"
          onClick={onCancel}
          isDisabled={loading}
        >
          Cancelar
        </Button>

        <Button
          colorScheme="blue"
          isLoading={loading}
          onClick={() => void handleSubmit()}
        >
          Salvar
        </Button>
      </Stack>
    </Stack>
  );
}
