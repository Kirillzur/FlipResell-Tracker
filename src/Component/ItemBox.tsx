import { Box, Flex, Text, Badge, Stack, Heading, VStack, Button, IconButton } from "@chakra-ui/react";
import type { Item } from "./types";
import { FiMoreVertical } from "react-icons/fi";

const fmtAmount = (n?: number) =>
  typeof n === "number" && !Number.isNaN(n) ? `£${n.toFixed(2)}` : "—";

const daysBetween = (start?: string, end?: string) => {
  if (!start || !end) return undefined;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const ms = Math.abs(d2.getTime() - d1.getTime());
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

interface ItemBoxProps {
  items: Item[];
}

const ItemBox = ({ items }: ItemBoxProps) => {
  const recent = items.slice(0, 3);

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

      {/* Items */}
      {recent.length === 0 ? (
        <Box
          bg="var(--white-color)"
          border="var(--border-color)"
          borderRadius="var(--border-radius)"
          p={5}
          boxShadow="sm"
        >
          <Text color="var(--secondary-color)">No items yet. Add your first item.</Text>
        </Box>
      ) : (
        <Stack gap={4}>
          {recent.map((it) => {
            const profit = it.sellPrice != null ? it.sellPrice - it.price : undefined;
            const daysHeld = daysBetween(it.date, it.sellDate);
            const mainAmount = it.sellPrice ?? it.price;

            return (
              <Box
                key={it.id}
                bg="var(--white-color)"
                border="var(--border-color)"
                borderRadius="var(--border-radius)"
                p={5}
                boxShadow="sm"
              >
                {/* Top Row: Title + Price */}
                <Flex justify="space-between" align="start">
                  <Box>
                    <Heading size="md">{it.name}</Heading>
                    <Text mt={1} fontSize="sm" textAlign="left" color="var(--secondary-color)">
                      {fmtAmount(mainAmount)}
                    </Text>
                  </Box>
                  <Text fontSize="2xl" fontWeight="bold">
                    {fmtAmount(mainAmount)}
                    <IconButton aria-label= "Delete Item" size="xs" marginLeft="10px" variant="outline" mb="4px">
                      <FiMoreVertical />
                    </IconButton>
                  </Text>
                </Flex>

                {/* Middle Info */}
                <Stack mt={4}>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="var(--secondary-color)">
                      Buy: <Text as="span" color="var(--primary-color)">{fmtAmount(it.price)}</Text>
                    </Text>
                    <Text fontSize="sm" color="var(--secondary-color)">
                      Sell: <Text as="span" color="var(--primary-color)">{fmtAmount(it.sellPrice)}</Text>
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="var(--secondary-color)">
                      Buy date: <Text as="span" color="var(--primary-color)">{it.date || "—"}</Text>
                    </Text>
                    <Text fontSize="sm" color="var(--secondary-color)">
                      Sell date: <Text as="span" color="var(--primary-color)">{it.sellDate || "—"}</Text>
                    </Text>
                  </Flex>
                </Stack>

                {/* Bottom Row: Days + Profit */}
                <Flex justify="space-between" align="center" mt={4}>
                  <Badge px={3} py={1} borderRadius="var(--border-radius)" colorScheme="gray">
                    {daysHeld != null ? `${daysHeld} days` : "Not sold"}
                  </Badge>
                  <Text fontWeight="bold" fontSize="lg" color="var(--green-color)">
                    {fmtAmount(profit)}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Stack>
      )}
    </VStack>
  );
};

export default ItemBox;
