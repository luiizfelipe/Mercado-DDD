import {
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import type { Produto } from "~/types/product";

type Propriedades = {
  produtos: Produto[];
  aoEditar: (produto: Produto) => void;
  aoExcluir: (produto: Produto) => void;
};

export function TabelaProdutos({
  produtos,
  aoEditar,
  aoExcluir,
}: Propriedades) {
  if (!produtos.length) {
    return (
      <Text color="gray.500">
        Nenhum produto encontrado.
      </Text>
    );
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Preço</Th>
          <Th>Estoque</Th>
          <Th>Status</Th>
          <Th textAlign="right">Ações</Th>
        </Tr>
      </Thead>

      <Tbody>
        {produtos.map((produto) => (
          <Tr key={produto.id}>
            <Td>
              <Text fontWeight="medium">
                {produto.name}
              </Text>
            </Td>

            <Td>
              R${" "}
              {produto.price
                .toFixed(2)
                .replace(".", ",")}
            </Td>

            <Td>{produto.stock}</Td>

            <Td>
              {produto.active ? "Ativo" : "Inativo"}
            </Td>

            <Td>
              <HStack justify="flex-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => aoEditar(produto)}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => aoExcluir(produto)}
                >
                  Excluir
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

