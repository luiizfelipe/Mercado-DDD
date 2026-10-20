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

import type { Product } from "../types";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  if (!products.length) {
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
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>
              <Text fontWeight="medium">
                {product.name}
              </Text>
            </Td>

            <Td>
              R${" "}
              {product.price
                .toFixed(2)
                .replace(".", ",")}
            </Td>

            <Td>{product.stock}</Td>

            <Td>
              {product.active ? "Ativo" : "Inativo"}
            </Td>

            <Td>
              <HStack justify="flex-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => onDelete(product)}
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
