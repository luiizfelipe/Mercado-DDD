import {
  Badge,
  Box,
  Button,
  Hide,
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
      <Box px={6} py={12} textAlign="center">
        <Text fontSize="lg" fontWeight="semibold">Seu catálogo está vazio</Text>
        <Text color="gray.500" mt={2}>Adicione seu primeiro produto para começar a organizar o estoque.</Text>
      </Box>
    );
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th px={6}>Produto</Th>
          <Th>Preço</Th>
          <Th>Estoque</Th>
          <Hide below="md"><Th>Status</Th></Hide>
          <Th textAlign="right" px={6}>Ações</Th>
        </Tr>
      </Thead>

      <Tbody>
        {produtos.map((produto) => (
          <Tr key={produto.id}>
            <Td px={6}>
              <Text fontWeight="medium">
                {produto.name}
              </Text>
              {produto.description && <Text color="gray.500" fontSize="sm" noOfLines={1} maxW="360px">{produto.description}</Text>}
            </Td>

            <Td>
              R${" "}
              {produto.price
                .toFixed(2)
                .replace(".", ",")}
            </Td>

            <Td>{produto.stock}</Td>

            <Hide below="md"><Td><Badge colorScheme={produto.active ? "green" : "gray"} borderRadius="full" px={2}>{produto.active ? "Ativo" : "Inativo"}</Badge></Td></Hide>

            <Td px={6}>
              <HStack justify="flex-end" spacing={2}>
                <Button
                  size="sm"
                  variant="outline"
                  borderRadius="lg"
                  onClick={() => aoEditar(produto)}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  borderRadius="lg"
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

