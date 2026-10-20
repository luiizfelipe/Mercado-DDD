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

import { ProductForm } from "~/features/products/components/ProductForm";
import { ProductTable } from "~/features/products/components/ProductTable";
import { useProducts } from "~/features/products/hooks/useProducts";
import type { Product } from "~/features/products/types";

export default function ProductsPage() {
  const {
    products,
    loading,
    saving,
    error,
    create,
    update,
    remove,
    reload,
  } = useProducts();

  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  async function handleSubmit(data: Parameters<typeof create>[0]) {
    if (editing) {
      await update(editing.id, data);
    } else {
      await create(data);
    }

    setEditing(null);
    setOpen(false);
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Deseja excluir o produto "${product.name}"?`,
    );

    if (confirmed) {
      await remove(product.id);
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

        {error && (
          <Alert status="error">
            <Text>{error}</Text>
          </Alert>
        )}

        <Box borderWidth="1px" borderRadius="lg" p="5">
          {loading ? (
            <HStack justify="center" py="12">
              <Spinner />

              <Text>Carregando produtos...</Text>
            </HStack>
          ) : (
            <ProductTable
              products={products}
              onEdit={(product) => {
                setEditing(product);
                setOpen(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </Box>

        <HStack justify="flex-end">
          <Button variant="ghost" onClick={() => void reload()}>
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
            <ProductForm
              product={editing}
              loading={saving}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
