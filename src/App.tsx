import './App.css'
import { useDisclosure } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
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

  return (
    <>
      <NavBar onAddClick={onOpen} />
      {open && (
        <AddItemModal
          onSave={(item) => {
            setItems((prev) => [item, ...prev])
            setForm(initialForm)
            onClose()
          }}
          onClose={onClose}
          form={form}
          setForm={setForm}
        />
      )}
      <RevenueMonth />
      <RevenueAllTime />
      <TotalSold />
      <ItemBox items={items} />
    </>
  )
}

export default App
