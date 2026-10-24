import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FormularioProduto } from "~/components/FormularioProduto";
import { TabelaProdutos } from "~/components/TabelaProdutos";
import { useProdutos } from "~/hooks/useProdutos";
import type { Produto } from "~/types/product";

export default function PaginaProdutos() {
  const {
    produtos,
    carregando,
    salvando,
    erro,
    criar,
    atualizar,
    remover,
    recarregar,
  } = useProdutos();

  const [editing, setEditing] = useState<Produto | null>(null);
  const [open, setOpen] = useState(false);

  async function salvarProduto(data: Parameters<typeof criar>[0]) {
    if (editing) {
      await atualizar(editing.id, data);
    } else {
      await criar(data);
    }

    setEditing(null);
    setOpen(false);
  }

  async function excluirProduto(produto: Produto) {
    const confirmed = window.confirm(
      `Deseja excluir o produto "${produto.name}"?`,
    );

    if (confirmed) {
      await remover(produto.id);
    }
  }

  return (
    <Box maxW="1400px" mx="auto" p={{ base: 4, md: 8 }}>
      <Stack spacing="6">
        <HStack justify="space-between">
          <Box>
            <Heading size="lg">Produtos</Heading>

            <Text color="gray.600">
              Cadastro e gerenciamento de produtos.
            </Text>
          </Box>

          <Button
            colorScheme="blue"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Novo produto
          </Button>
        </HStack>

        {erro && (
          <Alert status="error">
            <Text>{erro}</Text>
          </Alert>
        )}

        <Box borderWidth="1px" borderRadius="lg" p="5">
          {carregando ? (
            <HStack justify="center" py="12">
              <Spinner />

              <Text>Carregando produtos...</Text>
            </HStack>
          ) : (
            <TabelaProdutos
              produtos={produtos}
              aoEditar={(produto) => {
                setEditing(produto);
                setOpen(true);
              }}
              aoExcluir={excluirProduto}
            />
          )}
        </Box>

        <HStack justify="flex-end">
          <Button variant="ghost" onClick={() => void recarregar()}>
            Atualizar
          </Button>
        </HStack>
      </Stack>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="lg"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            {editing ? "Editar produto" : "Novo produto"}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormularioProduto
              produto={editing}
              carregando={salvando}
              aoSalvar={salvarProduto}
              aoCancelar={() => setOpen(false)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}



