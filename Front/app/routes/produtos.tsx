import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

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
  const produtosAtivos = produtos.filter((produto) => produto.active).length;
  const unidadesEmEstoque = produtos.reduce((total, produto) => total + produto.stock, 0);

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
    <Box minH="100vh" bg="gray.50">
      <Box bg="white" borderBottomWidth="1px">
        <Container maxW="6xl" py={4}>
          <HStack justify="space-between" flexWrap="wrap" gap={3}>
            <HStack spacing={3}>
              <Box bg="blue.600" color="white" borderRadius="lg" px={3} py={2} fontWeight="bold">M</Box>
              <Text fontWeight="bold" fontSize="lg">Mercado</Text>
            </HStack>
            <HStack spacing={2}>
              <Button as={RouterLink} to="/" variant="ghost">Início</Button>
              <Button as={RouterLink} to="/pedidos/novo" variant="ghost">Novo pedido</Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 8, md: 12 }}>
        <Stack spacing={8}>
          <HStack justify="space-between" align="flex-end" flexWrap="wrap" gap={5}>
            <Box maxW="2xl">
              <Badge colorScheme="blue" borderRadius="full" px={3} py={1} mb={4}>CATÁLOGO</Badge>
              <Heading size={{ base: "xl", md: "2xl" }}>Produtos</Heading>
              <Text color="gray.600" mt={3} fontSize={{ base: "md", md: "lg" }}>
                Gerencie seu catálogo, preços e disponibilidade em estoque.
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              size="lg"
              borderRadius="xl"
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              Novo produto
            </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
            <Box bg="white" borderWidth="1px" borderRadius="xl" p={5}>
              <Text color="gray.500" fontSize="sm">Produtos cadastrados</Text>
              <Heading size="lg" mt={2}>{produtos.length}</Heading>
            </Box>
            <Box bg="white" borderWidth="1px" borderRadius="xl" p={5}>
              <Text color="gray.500" fontSize="sm">Produtos ativos</Text>
              <Heading size="lg" mt={2} color="green.600">{produtosAtivos}</Heading>
            </Box>
            <Box bg="white" borderWidth="1px" borderRadius="xl" p={5}>
              <Text color="gray.500" fontSize="sm">Unidades em estoque</Text>
              <Heading size="lg" mt={2}>{unidadesEmEstoque}</Heading>
            </Box>
          </SimpleGrid>

        {erro && (
          <Alert status="error" borderRadius="xl">
            <AlertIcon />
            <Text>{erro}</Text>
          </Alert>
        )}

        <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" overflowX="auto">
          <HStack justify="space-between" px={{ base: 4, md: 6 }} py={5} borderBottomWidth="1px" borderColor="gray.100">
            <VStack align="flex-start" spacing={1}>
              <Heading size="sm">Todos os produtos</Heading>
              <Text color="gray.500" fontSize="sm">{produtos.length} {produtos.length === 1 ? "produto" : "produtos"} no catálogo</Text>
            </VStack>
            <Button variant="ghost" size="sm" onClick={() => void recarregar()} isLoading={carregando}>
              Atualizar
            </Button>
          </HStack>
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
      </Stack>
      </Container>

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



