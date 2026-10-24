import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router";

import { produtosApi } from "~/lib/http/produtosApi";
import { pedidosApi } from "~/lib/http/pedidosApi";
import type { ItemPedidoRequest, Pedido } from "~/types/order";
import type { Produto } from "~/types/product";

type LinhaPedido = ItemPedidoRequest & { chave: number };

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function PaginaNovoPedido() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState<string | null>(null);
  const [itens, setItens] = useState<LinhaPedido[]>([]);
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pedidoCriado, setPedidoCriado] = useState<Pedido | null>(null);

  useEffect(() => {
    void produtosApi
      .listar()
      .then(setProdutos)
      .catch((err: unknown) =>
        setErroProdutos(
          err instanceof Error ? err.message : "Não foi possível carregar os produtos.",
        ),
      )
      .finally(() => setCarregandoProdutos(false));
  }, []);

  const produtosDisponiveis = produtos.filter((produto) => {
    const correspondeBusca = produto.name.toLocaleLowerCase("pt-BR").includes(busca.toLocaleLowerCase("pt-BR"));
    return produto.active && correspondeBusca && !itens.some((item) => item.produtoId === produto.id);
  });
  const produtosSelecionados = itens.flatMap((item) => {
    const produto = produtos.find((candidato) => candidato.id === item.produtoId);
    return produto ? [{ ...item, produto }] : [];
  });
  const totalUnidades = itens.reduce((total, item) => total + item.quantidade, 0);
  const total = produtosSelecionados.reduce(
    (soma, item) => soma + item.produto.price * item.quantidade,
    0,
  );

  function adicionarProduto(produtoId: string) {
    if (!produtoId) return;
    setItens((atuais) => [...atuais, { chave: Date.now(), produtoId, quantidade: 1 }]);
  }

  function atualizarQuantidade(chave: number, novaQuantidade: number) {
    setItens((atuais) =>
      atuais.map((item) => (item.chave === chave ? { ...item, quantidade: novaQuantidade } : item)),
    );
  }

  function removerItem(chave: number) {
    setItens((atuais) => atuais.filter((item) => item.chave !== chave));
  }

  async function enviarPedido() {
    if (!itens.length || itens.some((item) => item.quantidade < 1)) return;
    setSalvando(true);
    setErro(null);
    try {
      const pedido = await pedidosApi.criar({
        itens: itens.map(({ produtoId, quantidade }) => ({ produtoId, quantidade })),
      });
      setPedidoCriado(pedido);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível criar o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  if (pedidoCriado) {
    return (
      <Container maxW="3xl" py={{ base: 8, md: 16 }}>
        <VStack align="stretch" spacing={6}>
          <Alert status="success" borderRadius="lg">
            <AlertIcon />
            <AlertDescription>
              Pedido criado com sucesso. Situação: {String(pedidoCriado.status)}.
            </AlertDescription>
          </Alert>
          <Box borderWidth="1px" borderRadius="xl" p={{ base: 5, md: 8 }}>
            <Text color="gray.500" fontSize="sm">Número do pedido</Text>
            <Heading size="md" mt={2} wordBreak="break-all">{pedidoCriado.id}</Heading>
            <Text color="gray.600" mt={3}>
              {pedidoCriado.itens.length} {pedidoCriado.itens.length === 1 ? "produto" : "produtos"} no pedido
            </Text>
          </Box>
          <HStack>
            <Button colorScheme="blue" onClick={() => navigate("/pedidos/novo")}>Criar outro pedido</Button>
            <Button as={RouterLink} to="/produtos" variant="outline">Voltar aos produtos</Button>
          </HStack>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={{ base: 6, md: 10 }}>
      <Stack spacing={8}>
        <HStack justify="space-between" align="flex-start" flexWrap="wrap" gap={4}>
          <Box>
            <Text color="blue.600" fontSize="sm" fontWeight="semibold" mb={2}>VENDAS / NOVO PEDIDO</Text>
            <Heading size="lg">Novo pedido</Heading>
            <Text color="gray.600" mt={2}>Escolha os produtos e informe a quantidade de cada item.</Text>
          </Box>
          <Button as={RouterLink} to="/produtos" variant="outline">Voltar aos produtos</Button>
        </HStack>

        {erroProdutos && <Alert status="error" borderRadius="md"><AlertIcon />{erroProdutos}</Alert>}
        {erro && <Alert status="error" borderRadius="md"><AlertIcon />{erro}</Alert>}

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <FormControl gridColumn={{ md: "span 2" }}>
            <FormLabel>Buscar produto</FormLabel>
            <Input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Digite o nome do produto" />
          </FormControl>
          <FormControl>
            <FormLabel>Adicionar produto</FormLabel>
            <Select
              placeholder={carregandoProdutos ? "Carregando produtos..." : "Selecione um produto"}
              value=""
              onChange={(event) => adicionarProduto(event.target.value)}
              isDisabled={carregandoProdutos || produtosDisponiveis.length === 0}
            >
              {produtosDisponiveis.map((produto) => (
                <option key={produto.id} value={produto.id}>{produto.name} · {currency.format(produto.price)}</option>
              ))}
            </Select>
          </FormControl>
        </SimpleGrid>

        {carregandoProdutos ? (
          <HStack justify="center" py={12}><Spinner /><Text>Carregando catálogo...</Text></HStack>
        ) : produtos.length === 0 && !erroProdutos ? (
          <Alert status="info" borderRadius="md"><AlertIcon />Cadastre produtos antes de criar um pedido.</Alert>
        ) : null}

        <Box borderWidth="1px" borderRadius="xl" overflowX="auto">
          <Box px={5} py={4} borderBottomWidth="1px">
            <HStack justify="space-between">
              <Box>
                <Heading size="sm">Itens do pedido</Heading>
                <Text color="gray.500" fontSize="sm" mt={1}>Adicione um ou mais produtos ao pedido.</Text>
              </Box>
              <Badge colorScheme={itens.length ? "blue" : "gray"} borderRadius="full" px={3} py={1}>
                {itens.length} {itens.length === 1 ? "item" : "itens"}
              </Badge>
            </HStack>
          </Box>
          {produtosSelecionados.length ? (
            <Table variant="simple" minW="680px">
              <Thead><Tr><Th>Produto</Th><Th>Preço unitário</Th><Th>Quantidade</Th><Th textAlign="right">Subtotal</Th><Th /></Tr></Thead>
              <Tbody>
                {produtosSelecionados.map(({ chave, quantidade, produto }) => (
                  <Tr key={chave}>
                    <Td><Text fontWeight="medium">{produto.name}</Text>{produto.description && <Text color="gray.500" fontSize="sm" noOfLines={1}>{produto.description}</Text>}</Td>
                    <Td>{currency.format(produto.price)}</Td>
                    <Td><NumberInput min={1} max={produto.stock > 0 ? produto.stock : undefined} value={quantidade} onChange={(_, value) => atualizarQuantidade(chave, Number.isFinite(value) && value > 0 ? Math.floor(value) : 1)} maxW="28"><NumberInputField aria-label={`Quantidade de ${produto.name}`} /></NumberInput></Td>
                    <Td textAlign="right" fontWeight="semibold">{currency.format(produto.price * quantidade)}</Td>
                    <Td><IconButton aria-label={`Remover ${produto.name}`} icon={<Text fontSize="lg">×</Text>} size="sm" variant="ghost" colorScheme="red" onClick={() => removerItem(chave)} /></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <VStack py={12} px={6} spacing={3}>
              <Text fontSize="3xl" aria-hidden="true">🛒</Text>
              <Text fontWeight="semibold">Nenhum produto adicionado</Text>
              <Text color="gray.500" fontSize="sm" textAlign="center">Use o campo acima para escolher os itens deste pedido.</Text>
            </VStack>
          )}
        </Box>

        <Box borderWidth="1px" borderRadius="xl" p={{ base: 5, md: 6 }} bg="gray.50">
          <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <HStack spacing={8}>
              <Box><Text fontSize="sm" color="gray.500">Quantidade total</Text><Text fontSize="lg" fontWeight="semibold">{totalUnidades} {totalUnidades === 1 ? "unidade" : "unidades"}</Text></Box>
              <Box><Text fontSize="sm" color="gray.500">Total do pedido</Text><Text fontSize="2xl" fontWeight="bold" color="blue.700">{currency.format(total)}</Text></Box>
            </HStack>
            <Button colorScheme="blue" size="lg" onClick={() => void enviarPedido()} isLoading={salvando} isDisabled={!itens.length || itens.some((item) => item.quantidade < 1)}>
              Confirmar pedido
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Container>
  );
}







