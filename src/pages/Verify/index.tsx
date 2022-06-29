import {Button, Center, Code, Stack, Text} from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"
import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";

const Verify = () => {
  const { library, account } = useActiveWeb3React()
  const [payload, setPayload] = useState({
    guild: null,
    member: null
  })
  const [signer, setSigner] = useState<undefined | string>()
  const [params] = useSearchParams()
  const state = params.get('state')

  const message = useMemo(() => {
    return `Guild: ${payload.guild} Member: ${payload.member}`
  }, [payload])

  const fetchPayload = useCallback(async () => {
    try {
      const q = await fetch(`https://api.wakanda-labs.com/discord?state=${state}`)
      const res = await q.json()
      if (res) {
        setPayload(JSON.parse(res))
      }
    } catch (e) {
      console.log(e)
    }
  }, [state])

  const postSignature = async (state: string, message: string, signature: string) => {
    try {
      const q = await fetch('https://api.wakanda-labs.com/discord', {
        method: 'POST',
        body: JSON.stringify({
          state: state,
          message: message,
          signature: signature
        })
      })
      const res = await q.json()
      if (res) {
        setSigner(res)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchPayload()
  }, [fetchPayload])

  return (
    <Center>
      <Stack alignItems={"center"} w={'container.sm'} spacing={4}>
        <Text fontWeight={'bold'} fontSize={'xl'}>Please sign the message below</Text>
        <Code p={4} borderRadius={'12px'} minW={'420px'} h={'160px'} colorScheme={'pink'} variant={"outline"}>
          { message }
        </Code>
        <Text fontSize={'sm'} fontWeight={'semibold'}>Never share your seed phrase or private key!</Text>
        <Button disabled={!account || !payload.member} onClick={async () => {
          if (state) {
            const signature = await library?.getSigner().signMessage(message)
            if (signature) {
              await postSignature(state, message, signature)
            }
          }
        }}>
          Sign Message
        </Button>

        <Text>Signer: {signer}</Text>
      </Stack>
    </Center>
  )
}

export default Verify
