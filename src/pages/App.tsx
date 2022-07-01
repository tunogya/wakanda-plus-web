import { Route, Routes } from "react-router-dom"
import Web3ReactManager from "../components/Web3ReactManager"
import { HStack, Stack, Text } from "@chakra-ui/react"
import Home from "./Home"
import { WalletModal } from "../components/Web3Status"
import Sign from "./Sign"

function App() {
  return (
    <Web3ReactManager>
      <Stack p={4} spacing={8}>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={'bold'}>Wakanda+</Text>
          <WalletModal />
        </HStack>
        <Stack w={"full"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign/:state" element={<Sign />} />
          </Routes>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
