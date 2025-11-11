import React, { useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Stack,
  Heading,
  VStack,
  Button,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import type { Item } from "./types";

export type FormState = {
  name: string;
  price: string;
  sellPrice: string;
  date: string;
  sellDate: string;
};

export interface AddItemModalProps {
  onSave: (item: Item) => void;
  onClose: () => void;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}

export const AddItemModal = ({ onSave, onClose, form, setForm }: AddItemModalProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const profit = useMemo(() => {
    if (!form.price || !form.sellPrice) return undefined;
    return Number(form.sellPrice) - Number(form.price);
  }, [form.price, form.sellPrice]);

  const daysHeld = useMemo(() => {
    if (!form.date || !form.sellDate) return undefined;
    const d1 = new Date(form.date);
    const d2 = new Date(form.sellDate);
    const ms = Math.abs(d2.getTime() - d1.getTime());
    return Math.round(ms / (1000 * 60 * 60 * 24));
  }, [form.date, form.sellDate]);

  const handleSave = () => {
    if (!form.name || !form.price || !form.date) return alert("Please fill all required fields, including Name, BuyPrice, and BuyDate."); // minimal guard
    // Robust ID generation across browsers
    const newId = (globalThis as any).crypto?.randomUUID
      ? (globalThis as any).crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now();
    const item: Item = {
      id: newId,
      name: form.name.trim(),
      price: Number(form.price),
      sellPrice: form.sellPrice ? Number(form.sellPrice) : undefined,
      date: form.date,
      sellDate: form.sellDate || undefined,
    };
    onSave(item);
  };

  const handleClose = () => {
    onClose();
  };

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
      {/* Top: Heading + Actions */}
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="md" textAlign="left">
            Add Item
          </Heading>
          <Text mt={1} fontSize="10px" color="var(--secondary-color)">
            Fill the fields and click Save
          </Text>
        </Box>
        <Flex direction={{ base: "column", sm: "row" }} gap={3}>
          <Button
            fontSize="xs"
            borderRadius="var(--border-radius)"
            w={{ base: "full", sm: "auto" }}
            onClick={handleSave}
          >
            Save
          </Button>
          <CloseButton onClick={handleClose} />
        </Flex>
      </Flex>

      {/* Main Box */}
      <Box
        bg="var(--white-color)"
        border="var(--border-color)"
        borderRadius="var(--border-radius)"
        p={5}
        boxShadow="sm"
      >
        {/* Top Row: Name + Sell Price */}
        <Flex justify="space-between" align="start" gap={4} flexWrap="wrap">
          <Box flex="1">
            <Input
              placeholder="Item Name (e.g., PlayStation 5 Slim)"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Text
              mt={1}
              fontSize="sm"
              textAlign="left"
              color="var(--secondary-color)"
            >
              {/** Optional SKU/code field — show first 8 chars of future id, or leave blank */}
              {/* You can wire a separate SKU input if you want */}
            </Text>
          </Box>
        </Flex>

        {/* Middle Info */}
        <Stack mt={4}>
          <Flex justify="space-between" gap={4} flexWrap="wrap">
            <Box flex="1">
              <Text fontSize="sm" color="var(--secondary-color)" mb={1}>
                Buy:
              </Text>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Buy Price (£)"
              />
            </Box>

            <Box flex="1">
              <Text fontSize="sm" color="var(--secondary-color)" mb={1}>
                Sell:
              </Text>
              <Input
                type="number"
                name="sellPrice"
                value={form.sellPrice}
                onChange={handleChange}
                placeholder="Sell Price (£)"
              />
            </Box>
          </Flex>

          <Flex justify="space-between" gap={4} flexWrap="wrap">
            <Box flex="1">
              <Text fontSize="sm" color="var(--secondary-color)" mb={1}>
                Buy date:
              </Text>
              <Input
                type="date"
                name="date"
                cursor="pointer"
                value={form.date}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1">
              <Text fontSize="sm" color="var(--secondary-color)" mb={1}>
                Sell date:
              </Text>
              <Input
                type="date"
                name="sellDate"
                cursor="pointer"
                value={form.sellDate}
                onChange={handleChange}
              />
            </Box>
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
            {daysHeld != null ? `${daysHeld} days` : "Not sold"}
          </Badge>
          <Text fontWeight="bold" fontSize="lg" color="var(--green-color)">
            {profit != null ? `£${profit.toFixed(2)}` : "—"}
          </Text>
        </Flex>
      </Box>
    </VStack>
  );
};

export default AddItemModal;
