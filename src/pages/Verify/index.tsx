import {Button, HStack, Stack, Text} from "@chakra-ui/react"
import {WalletModal} from "../../components/Web3Status"
import {useActiveWeb3React} from "../../hooks/web3";

const Verify = () => {

  const { library } = useActiveWeb3React()

  const handleSignature = async () => {
    const res = await library?.getSigner().signMessage('Hello')
    console.log(res)
  }

  return (
    <Stack>
      <Text>Verify</Text>
      <Button onClick={handleSignature}>
        Signature
      </Button>
    </Stack>
  )
}

export default Verify