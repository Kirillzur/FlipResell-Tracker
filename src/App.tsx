import './App.css'
import { useDisclosure } from '@chakra-ui/react'
import NavBar from './Component/NavBar'
import ItemBox from './Component/ItemBox'
import RevenueMonth from './Component/RevenueMonth'
import RevenueAllTime from './Component/RevenueAllTime'
import TotalSold from './Component/TotalSold'
import AddItemModal from './Component/AddItemModal'




function App() {
const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBar  onAddClick={onOpen}/>
      {open && (
        <AddItemModal
          isOpen={open}
          onClose={onClose}
          onSave={(item) => {
            // save item to state here
            onClose();
          }}
        />
      )}
      <RevenueMonth />
      <RevenueAllTime />
      <TotalSold />
      <ItemBox />
    </>
  )
}

export default App
