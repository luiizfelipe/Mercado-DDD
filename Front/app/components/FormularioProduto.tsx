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

import type { CadastroProduto, Produto } from "~/types/product";

type Propriedades = {
  produto?: Produto | null;
  carregando?: boolean;
  aoSalvar: (dados: CadastroProduto) => Promise<void>;
  aoCancelar: () => void;
};

const formularioVazio: CadastroProduto = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  active: true,
};

export function FormularioProduto({
  produto,
  carregando = false,
  aoSalvar,
  aoCancelar,
}: Propriedades) {
  const [formulario, setFormulario] = useState<CadastroProduto>(formularioVazio);

  useEffect(() => {
    if (produto) {
      setFormulario({
        name: produto.name,
        description: produto.description ?? "",
        price: produto.price,
        stock: produto.stock,
        active: produto.active,
      });
    } else {
      setFormulario({ ...formularioVazio });
    }
  }, [produto]);

  function atualizar<K extends keyof CadastroProduto>(
    campo: K,
    valor: CadastroProduto[K],
  ) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function salvar() {
    await aoSalvar(formulario);
  }

  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel>Nome</FormLabel>

        <Input
          value={formulario.name}
          onChange={(e) => atualizar("name", e.target.value)}
          placeholder="Ex.: Arroz 5 kg"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Descrição</FormLabel>

        <Textarea
          value={formulario.description}
          onChange={(e) => atualizar("description", e.target.value)}
          placeholder="Descrição do produto"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Preço</FormLabel>

        <NumberInput
          min={0}
          value={String(formulario.price)}
          onChange={(_, valueAsNumber) =>
            atualizar(
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
          value={String(formulario.stock)}
          onChange={(_, valueAsNumber) =>
            atualizar(
              "stock",
              Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
            )
          }
        >
          <NumberInputField placeholder="0" />
        </NumberInput>
      </FormControl>

      <Switch
        isChecked={formulario.active}
        onChange={(e) => atualizar("active", e.target.checked)}
      >
        Produto ativo
      </Switch>

      <Stack direction="row" justify="flex-end">
        <Button
          variant="outline"
          onClick={aoCancelar}
          isDisabled={carregando}
        >
          Cancelar
        </Button>

        <Button
          colorScheme="blue"
          isLoading={carregando}
          onClick={() => void salvar()}
        >
          Salvar
        </Button>
      </Stack>
    </Stack>
  );
}

