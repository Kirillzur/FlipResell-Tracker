import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Stack,
  Heading,
  VStack,
  IconButton,
  Menu,
  useDisclosure,
} from "@chakra-ui/react";
import type { Item } from "../Component/types";
import AddItemModal, { type FormState } from "../Component/AddItemModal";
import { subscribeItems, saveItem, deleteItemById } from "../services/items";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";

// Items now fully managed by Firestore

const fmtAmount = (n?: number) =>
  typeof n === "number" && !Number.isNaN(n) ? `£${n.toFixed(2)}` : "—";

const daysBetween = (start?: string, end?: string) => {
  if (!start || !end) return undefined;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const ms = Math.abs(d2.getTime() - d1.getTime());
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

const initialForm: FormState = {
  name: "",
  price: "",
  sellPrice: "",
  date: "",
  sellDate: "",
};

const AllSales = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const unsub = subscribeItems(setItems);
    return () => unsub();
  }, []);

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setForm({
      name: item.name ?? "",
      price: item.price != null ? String(item.price) : "",
      sellPrice: item.sellPrice != null ? String(item.sellPrice) : "",
      date: item.date ?? "",
      sellDate: item.sellDate ?? "",
    });
    onOpen();
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
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="md" textAlign="left">
            All Sales
          </Heading>
          <Text mt={1} fontSize="10px" color="var(--secondary-color)">
            Full list of your items
          </Text>
        </Box>
      </Flex>

      {open && (
        <AddItemModal
          onSave={async (item) => {
            try {
              if (editingId) {
                await saveItem({ ...item, id: editingId });
              } else {
                await saveItem(item);
              }
              setForm(initialForm);
              setEditingId(null);
              onClose();
            } catch (e: any) {
              console.error('Failed to save item', e);
              alert(
                e?.message || 'Failed to save item. Check Firebase config and rules.'
              );
            }
          }}
          onClose={onClose}
          form={form}
          setForm={setForm}
        />
      )}

      {items.length === 0 ? (
        <Box
          bg="var(--white-color)"
          border="var(--border-color)"
          borderRadius="var(--border-radius)"
          p={5}
          boxShadow="sm"
        >
          <Text color="var(--secondary-color)">
            No items yet. Add your first item.
          </Text>
        </Box>
      ) : (
        <Stack gap={4}>
          {items.map((it) => {
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
                  <Flex position="relative" align="center">
                    <Text fontSize="2xl" fontWeight="bold">
                      {fmtAmount(mainAmount)}
                    </Text>
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <IconButton aria-label="Open item menu" size="xs" variant="outline" ml="10px">
                          <FiMoreVertical />
                        </IconButton>
                      </Menu.Trigger>
                      <Menu.Content position="absolute" top="100%" right="0" minW="180px" zIndex={1}>
                        <Menu.Item cursor="pointer" value="Edit" onClick={() => handleEdit(it)}>
                          <MdEdit />
                          <Box>Edit</Box>
                        </Menu.Item>
                        <Menu.Item color="fg.error" cursor="pointer" value="Delete" onClick={async () => {
                          try {
                            const ok = window.confirm(`Are you sure you want to delete \"${it.name}\"?`);
                            if (!ok) return;
                            await deleteItemById(it.id);
                            if (editingId === it.id) {
                              setEditingId(null);
                              setForm(initialForm);
                              onClose();
                            }
                          } catch (e: any) {
                            console.error('Failed to delete item', e);
                            alert(
                              e?.message || 'Failed to delete item. Check Firebase config and rules.'
                            );
                          }
                        }}>
                          <MdDelete />
                          <Box>Delete...</Box>
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Root>
                  </Flex>
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

export default AllSales;
