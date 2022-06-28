import {Route, Routes} from 'react-router-dom'
import Web3ReactManager from "../components/Web3ReactManager"
import {Stack} from "@chakra-ui/react";
import Home from "./Home";

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
          </Routes>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
