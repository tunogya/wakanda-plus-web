import {Route, Routes} from 'react-router-dom'
import Web3ReactManager from "../components/Web3ReactManager"
import Home from "./Home";
import WCO2 from "./WCO2";
import NFTs from "./NFTs";
import Pets from "./Pets";
import Orders from "./Orders";
import Login from "./Login";
import {Stack} from "@chakra-ui/react";
import Account from "./Account";

function App() {
  return (
    <Web3ReactManager>
      <Stack alignItems={"center"} w={"full"}>
        <Stack w={"full"} maxW={'container.md'} h={"full"} p={5}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/wco2" element={<WCO2/>}/>
            <Route path="/nfts" element={<NFTs/>}/>
            <Route path="/pets" element={<Pets/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/account" element={<Account />} />
          </Routes>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
