import {Button, Stack, Text} from "@chakra-ui/react"
import {useActiveWeb3React} from "../../hooks/web3";
import { ethers } from "ethers";

const Verify = () => {
  const { library, account } = useActiveWeb3React()

  const handleSignature = async () => {
    const signature = await library?.getSigner().signMessage('Hello')
    if (signature) {
      const r = signature.slice(0, 66)
      const s = '0x' + signature.slice(66, 130)
      const v =  parseInt('0x' + signature.slice(130, 132), 16)
      const res = ethers.utils.verifyMessage('Hello', {r: r, s: s, v: v})
      console.log(res)
    }
  }

  return (
    <Stack>
      <Text>Verify</Text>
      <Button
        disabled={!account}
        onClick={handleSignature}
      >
        Signature
      </Button>


    </Stack>
  )
}

export default Verify