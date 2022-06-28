import {Route, Routes} from 'react-router-dom'
import Web3ReactManager from "../components/Web3ReactManager"
import {Stack} from "@chakra-ui/react";
import Home from "./Home";

function App() {
  return (
    <Web3ReactManager>
      <Stack w={"full"} p={4}>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
