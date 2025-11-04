import './App.css'
import { useDisclosure } from '@chakra-ui/react'
import { useState, useEffect, useMemo } from 'react'
import NavBar from './Component/NavBar'
import ItemBox from './Component/ItemBox'
import RevenueMonth from './Component/RevenueMonth'
import RevenueAllTime from './Component/RevenueAllTime'
import TotalSold from './Component/TotalSold'
import AddItemModal, { type FormState } from './Component/AddItemModal'
import type { Item } from './Component/types'

const initialForm: FormState = {
  name: '',
  price: '',
  sellPrice: '',
  date: '',
  sellDate: '',
}

const ITEMS_KEY = 'flipresell:items'
const FORM_KEY = 'flipresell:form'

function App() {
  const { open, onOpen, onClose } = useDisclosure()
  const [editingId, setEditingId] = useState<string | null>(null)

  // Initialize from localStorage synchronously
  const [form, setForm] = useState<FormState>(() => {
    try {
      const raw = localStorage.getItem(FORM_KEY)
      return raw ? (JSON.parse(raw) as FormState) : initialForm
    } catch {
      return initialForm
    }
  })

  const [items, setItems] = useState<Item[]>(() => {
    try {
      const raw = localStorage.getItem(ITEMS_KEY)
      return raw ? (JSON.parse(raw) as Item[]) : []
    } catch {
      return []
    }
  })

  // Persist on change
  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
  }, [items])
  useEffect(() => {
    localStorage.setItem(FORM_KEY, JSON.stringify(form))
  }, [form])

  // Derived revenue metrics
  const revenueAllTime = useMemo(() => {
    return items.reduce((sum, it) => {
      if (it.sellPrice != null) {
        return sum + (it.sellPrice - it.price)
      }
      return sum
    }, 0)
  }, [items])

  const revenue30Days = useMemo(() => {
    const now = new Date()
    const monthAgo = new Date(now)
    monthAgo.setDate(now.getDate() - 30)
    return items.reduce((sum, it) => {
      if (it.sellPrice != null && it.sellDate) {
        const sd = new Date(it.sellDate)
        if (sd >= monthAgo && sd <= now) {
          return sum + (it.sellPrice - it.price)
        }
      }
      return sum
    }, 0)
  }, [items])

  const handleAddClick = () => {
    // ensure clean form for new item
    setEditingId(null)
    setForm(initialForm)
    onOpen()
  }

  const handleEdit = (item: Item) => {
    // prefill form with existing item values
    setEditingId(item.id)
    setForm({
      name: item.name ?? '',
      price: item.price != null ? String(item.price) : '',
      sellPrice: item.sellPrice != null ? String(item.sellPrice) : '',
      date: item.date ?? '',
      sellDate: item.sellDate ?? '',
    })
    onOpen()
  }

  const handleDelete = (item: Item) => {
    const ok = window.confirm(`Are you sure you want to delete "${item.name}"?`)
    if (!ok) return
    setItems((prev) => prev.filter((it) => it.id !== item.id))
    if (editingId === item.id) {
      setEditingId(null)
      setForm(initialForm)
      onClose()
    }
  }

  return (
    <>
      <NavBar onAddClick={handleAddClick} />
      {open && (
        <AddItemModal
          onSave={(item) => {
            if (editingId) {
              setItems((prev) =>
                prev.map((it) =>
                  it.id === editingId
                    ? {
                        ...it,
                        id: editingId,
                        name: item.name,
                        price: item.price,
                        sellPrice: item.sellPrice,
                        date: item.date,
                        sellDate: item.sellDate,
                      }
                    : it
                )
              )
            } else {
              setItems((prev) => [item, ...prev])
            }
            setForm(initialForm)
            setEditingId(null)
            onClose()
          }}
          onClose={onClose}
          form={form}
          setForm={setForm}
        />
      )}
      <RevenueMonth amount={revenue30Days} />
      <RevenueAllTime amount={revenueAllTime} />
      <TotalSold count={items.filter((it) => it.sellPrice != null || it.sellDate != null).length} />
      <ItemBox items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  )
}

export default App
