import Web3ReactManager from "../components/Web3ReactManager"
import {Center, HStack, Stack, Text} from "@chakra-ui/react"
import Home from "./Home"
import { WalletModal } from "../components/Web3Status"

function App() {
  return (
    <Web3ReactManager>
      <Center>
        <Stack py={4} px={[2, 8, 16, 32]} w={'full'} spacing={8}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={'bold'}>Wakanda+</Text>
            <WalletModal />
          </HStack>
          <Home />
        </Stack>
      </Center>
    </Web3ReactManager>
  )
}

export default App
