import {Button, Center, Code, Stack, Text} from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"
import { ethers } from "ethers"
import {useSearchParams} from "react-router-dom";

const Verify = () => {
  const { library, account } = useActiveWeb3React()
  const [params] = useSearchParams()
  const guild = params.get('guild')
  const member = params.get('member')

  console.log(guild, member)

  const handleSignature = async () => {
    const signature = await library?.getSigner().signMessage("Hello")
    // need send signature to api
    if (signature) {
      const r = signature.slice(0, 66)
      const s = "0x" + signature.slice(66, 130)
      const v = parseInt("0x" + signature.slice(130, 132), 16)
      const res = ethers.utils.verifyMessage("Hello", { r: r, s: s, v: v })
      console.log(res)
    }
  }

  return (
    <Center>
      <Stack alignItems={"center"} w={'container.sm'} spacing={4}>
        <Text fontWeight={'bold'} fontSize={'xl'}>Please sign the message below</Text>
        <Code p={4} borderRadius={'12px'} minW={'420px'} h={'160px'} colorScheme={'pink'} variant={"outline"}>
          Guild: {guild} Member: {member}
        </Code>
        <Text fontSize={'sm'} fontWeight={'semibold'}>Never share your seed phrase or private key!</Text>
        <Button disabled={!account} onClick={handleSignature}>
          Sign Message
        </Button>
      </Stack>
    </Center>
  )
}

export default Verify
