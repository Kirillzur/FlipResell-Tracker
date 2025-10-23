import {
  Box,
  Flex,
  Text,
  Badge,
  Stack,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";

const ItemBox = () => {
  return (
    <VStack
      className="page--container"
      gap={4}
      align="stretch"
      mt={4}
      p={4}
      border="var(--border-color)"
      bg="var(--white-color)"
      borderRadius="var(--border-radius)"
    >
      {/* Top Section of Container: Heading + Buttons */}
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="md" textAlign="left">
            Recent Sales (Last 3)
          </Heading>
          <Text mt={1} fontSize="10px" color="var(--secondary-color)">
            Tap "All Sales" to open the full list
          </Text>
        </Box>
        <Flex direction={{ base: "column", sm: "row" }} gap={3}>
          <Button
            fontSize="xs"
            borderRadius="var(--border-radius)"
            w={{ base: "full", sm: "auto" }}
          >
            All Sales
          </Button>
          <Button
            fontSize="xs"
            borderRadius="var(--border-radius)"
            bg="var(--white-color)"
            border="1px solid var(--secondary-color)"
            color="var(--primary-color)"
            w={{ base: "full", sm: "auto" }}
          >
            Export CSV
          </Button>
        </Flex>
      </Flex>

      {/* Top Section: Sales Box */}
      <Box
        bg="var(--white-color)"
        border="var(--border-color)"
        borderRadius="var(--border-radius)"
        p={5}
        boxShadow="sm"
      >
        {/* Top Row: Title + Price */}
        <Flex justify="space-between" align="start">
          <Box>
            <Heading size="md">PlayStation 5 Slim</Heading>
            <Text
              mt={1}
              fontSize="sm"
              textAlign="left"
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
    </VStack>
  );
};

export default ItemBox;
