import {HStack, Stack, Text} from "@chakra-ui/react"
import {WalletModal} from "../../components/Web3Status"

const Home = () => {
  return (
    <Stack>
      <HStack justifyContent={"space-between"}>
        <Text></Text>
        <WalletModal />
      </HStack>
    </Stack>
  )
}

export default Home