import { Route, Routes } from "react-router-dom"
import Web3ReactManager from "../components/Web3ReactManager"
import { HStack, Stack, Text } from "@chakra-ui/react"
import Home from "./Home"
import { WalletModal } from "../components/Web3Status"
import Verify from "./Verify"

function App() {
  return (
    <Web3ReactManager>
      <Stack p={4}>
        <HStack justifyContent={"space-between"}>
          <Text></Text>
          <WalletModal />
        </HStack>
        <Stack w={"full"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="verify" element={<Verify />} />
          </Routes>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
