import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

const atalhos = [
  {
    titulo: "Produtos",
    descricao: "Cadastre produtos, acompanhe o estoque e mantenha preços e informações atualizados.",
    destino: "/produtos",
    acao: "Acessar produtos",
    marca: "CATÁLOGO",
  },
  {
    titulo: "Novo pedido",
    descricao: "Monte um pedido com os produtos disponíveis e confira o total antes de confirmar.",
    destino: "/pedidos/novo",
    acao: "Criar pedido",
    marca: "VENDAS",
  },
];

export default function PaginaInicial() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="white" borderBottomWidth="1px">
        <Container maxW="6xl" py={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Box bg="blue.600" color="white" borderRadius="lg" px={3} py={2} fontWeight="bold">M</Box>
              <Text fontWeight="bold" fontSize="lg">Mercado</Text>
            </HStack>
            <HStack spacing={2}>
              <Button as={RouterLink} to="/produtos" variant="ghost">Produtos</Button>
              <Button as={RouterLink} to="/pedidos/novo" colorScheme="blue">Novo pedido</Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 12, md: 20 }}>
        <Stack spacing={12}>
          <Box maxW="3xl">
            <Badge colorScheme="blue" borderRadius="full" px={3} py={1} mb={5}>GESTÃO DO MERCADO</Badge>
            <Heading size={{ base: "2xl", md: "3xl" }} lineHeight="1.15">
              Seu mercado, organizado em um só lugar.
            </Heading>
            <Text color="gray.600" fontSize={{ base: "lg", md: "xl" }} mt={5}>
              Gerencie o catálogo de produtos e crie pedidos com praticidade.
            </Text>
            <HStack mt={8} spacing={3} flexWrap="wrap">
              <Button as={RouterLink} to="/pedidos/novo" colorScheme="blue" size="lg">Criar pedido</Button>
              <Button as={RouterLink} to="/produtos" variant="outline" size="lg">Ver produtos</Button>
            </HStack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {atalhos.map((atalho) => (
              <Box key={atalho.destino} bg="white" borderWidth="1px" borderRadius="2xl" p={{ base: 6, md: 8 }}>
                <Badge colorScheme="blue" mb={4}>{atalho.marca}</Badge>
                <Heading size="md">{atalho.titulo}</Heading>
                <Text color="gray.600" mt={3} minH={{ md: "3em" }}>{atalho.descricao}</Text>
                <Button as={RouterLink} to={atalho.destino} variant="link" colorScheme="blue" mt={6}>
                  {atalho.acao} →
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
