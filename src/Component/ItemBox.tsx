import { Box, Flex, Text, Badge, Stack, Heading } from "@chakra-ui/react";

const ItemBox = () => {
  return (
    <Box
      bg="var(--white-color)"
      border="var(--border-color)"
      borderRadius="var(--border-radius)"
      p={5}
      boxShadow="sm"
      mt="5"
    >
      {/* Top Row: Title + Price */}
      <Flex justify="space-between" align="start">
        <Box>
          <Heading size="md" lineHeight={1.2}>
            PlayStation 5 Slim
          </Heading>
          <Text
            textAlign="left"
            mt={1}
            fontSize="sm"
            color="var(--secondary-color)"
          >
            PS5-001
          </Text>
        </Box>

        <Text fontSize="2xl" fontWeight="bold">
          €399.00
        </Text>
      </Flex>

      {/* Middle Info */}
      <Stack mt={4}>
        <Flex justify="space-between">
          <Text fontSize="sm" color="var(--secondary-color)">
            Buy:{" "}
            <Text as="span" color="var(--primary-color)">
              €320.00
            </Text>
          </Text>
          <Text fontSize="sm" color="var(--secondary-color)">
            Sell:{" "}
            <Text as="span" color="var(--primary-color)">
              €399.00
            </Text>
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="sm" color="var(--secondary-color)">
            Buy date:{" "}
            <Text as="span" color="var(--primary-color)">
              2025-09-28
            </Text>
          </Text>
          <Text fontSize="sm" color="var(--secondary-color)">
            Sell date:{" "}
            <Text as="span" color="var(--primary-color)">
              2025-10-05
            </Text>
          </Text>
        </Flex>
      </Stack>

      {/* Bottom Row: Days + Profit */}
      <Flex justify="space-between" align="center" mt={4}>
        <Badge
          px={3}
          py={1}
          borderRadius="var(--border-radius)"
          colorScheme="gray"
        >
          7 days
        </Badge>

        <Text fontWeight="bold" fontSize="lg" color="var(--green-color)">
          €79.00
        </Text>
      </Flex>
    </Box>
  );
};

export default ItemBox;
