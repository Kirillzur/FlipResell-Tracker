import "./App.css";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import NavBar from "./Component/NavBar";
import ItemBox from "./Component/ItemBox";
import RevenueMonth from "./Component/RevenueMonth";
import RevenueAllTime from "./Component/RevenueAllTime";
import TotalSold from "./Component/TotalSold";
import AddItemModal, { type FormState } from "./Component/AddItemModal";
import type { Item } from "./Component/types";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import AllSales from "./pages/AllSales";
import { subscribeItems, saveItem, deleteItemById } from "./services/items";

const initialForm: FormState = {
  name: "",
  price: "",
  sellPrice: "",
  date: "",
  sellDate: "",
};

const FORM_KEY = "flipresell:form";

function App() {
  const { open, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Navigation to allSales page
  const openSalesPage = () => {
    navigate("/allSales");
  };

  // Initialize from localStorage synchronously
  const [form, setForm] = useState<FormState>(() => {
    try {
      const raw = localStorage.getItem(FORM_KEY);
      return raw ? (JSON.parse(raw) as FormState) : initialForm;
    } catch {
      return initialForm;
    }
  });

  // Items now live in Firestore only
  const [items, setItems] = useState<Item[]>([]);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(FORM_KEY, JSON.stringify(form));
  }, [form]);

  // Subscribe to Firestore when enabled
  useEffect(() => {
    const unsub = subscribeItems(setItems);
    return () => unsub();
  }, []);

  // Derived revenue metrics
 const revenueAllTime = useMemo(() => {
    return items.reduce((sum, it) => {
      if (it.sellPrice != null) {
        return sum + (it.sellPrice - it.price);
      }
      return sum;
    }, 0);
  }, [items]);

  const revenue30Days = useMemo(() => {
    const now = new Date();
    const monthAgo = new Date(now);
    monthAgo.setDate(now.getDate() - 30);
    return items.reduce((sum, it) => {
      if (it.sellPrice != null && it.sellDate) {
        const sd = new Date(it.sellDate);
        if (sd >= monthAgo && sd <= now) {
          return sum + (it.sellPrice - it.price);
        }
      }
      return sum;
    }, 0);
  }, [items]);

  const handleAddClick = () => {
    // ensure clean form for new item
    setEditingId(null);
    setForm(initialForm);
    onOpen();
  };

  const handleEdit = (item: Item) => {
    // prefill form with existing item values
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
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar onAddClick={handleAddClick} />
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
            <RevenueMonth amount={revenue30Days} />
            <RevenueAllTime amount={revenueAllTime} />
            <TotalSold
              count={
                items.filter(
                  (it) => it.sellPrice != null || it.sellDate != null
                ).length
              }
            />
            <ItemBox
              onOpenPage={openSalesPage}
              items={items}
              onEdit={handleEdit}
              onDelete={async (item) => {
                try {
                  const ok = window.confirm(
                    `Are you sure you want to delete "${item.name}"?`
                  );
                  if (!ok) return;
                  await deleteItemById(item.id);
                  if (editingId === item.id) {
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
              }}
            />
          </>
        }
      />
      <Route path="/allSales" element={<AllSales />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
