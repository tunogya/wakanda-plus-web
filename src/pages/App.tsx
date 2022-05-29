import {Route, Routes} from 'react-router-dom'
import Web3ReactManager from "../components/Web3ReactManager"
import Home from "./Home";
import WCO2 from "./WCO2";
import Pass from "./Pass";
import Login from "./Login";
import {Stack} from "@chakra-ui/react";
import Account from "./Account";
import WCO2Claim from "./WCO2/Claim";
import WCO2Burn from "./WCO2/Burn";
import Explore from "./Explore";

function App() {
  return (
    <Web3ReactManager>
      <Stack alignItems={"center"} w={"full"}>
        <Stack
          w={"full"}
          maxW={'container.lg'}
          h={"full"}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/wco2" element={<WCO2/>}/>
            <Route path="/wco2/claim" element={<WCO2Claim/>}/>
            <Route path="/wco2/burn" element={<WCO2Burn/>}/>
            <Route path="/pass" element={<Pass/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/account" element={<Account/>}/>
          </Routes>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
