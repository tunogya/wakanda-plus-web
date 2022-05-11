import {Route, Routes} from 'react-router-dom'
import Web3ReactManager from "../components/Web3ReactManager"
import Home from "./Home";
import WCO2 from "./WCO2";
import NFTs from "./NFTs";
import Pets from "./Pets";
import Orders from "./Orders";

function App() {
  return (
    <Web3ReactManager>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/wco2" element={<WCO2/>}/>
        <Route path="/nfts" element={<NFTs/>}/>
        <Route path="/pets" element={<Pets/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </Web3ReactManager>
  )
}

export default App
