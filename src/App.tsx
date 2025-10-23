import './App.css'
import NavBar from './Component/NavBar'
import ItemBox from './Component/ItemBox'
import RevenueMonth from './Component/RevenueMonth'
import RevenueAllTime from './Component/RevenueAllTime'
import TotalSold from './Component/TotalSold'


function App() {
  
  return (
    <>
      <NavBar />
      <RevenueMonth />
      <RevenueAllTime />
      <TotalSold />
      <ItemBox />
    </>
  )
}

export default App
