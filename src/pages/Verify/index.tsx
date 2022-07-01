import {Button, Center, Code, Divider, Stack, Text} from "@chakra-ui/react"
import {useActiveWeb3React} from "../../hooks/web3"
import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";
import {ethers} from "ethers"

const Verify = () => {
  const {library, account} = useActiveWeb3React()
  const [payload, setPayload] = useState({
    guild: null,
    member: null
  })
  const [signer, setSigner] = useState<undefined | string>()
  const [params] = useSearchParams()
  const state = params.get('state')
  const [status, setStatus] = useState(IDLE)

  const message = useMemo(() => {
    return `Guild: ${payload.guild} Member: ${payload.member}`
  }, [payload])

  const hashMessage = useMemo(() => {
    return ethers.utils.hashMessage(message)
  }, [message])

  const fetchPayload = useCallback(async () => {
    try {
      const q = await fetch(`https://api.wakanda-labs.com/discord?state=${state}`)
      const res = await q.json()
      if (res) {
        setPayload(res)
      }
    } catch (e) {
      console.log(e)
    }
  }, [state])

  const postSignature = async (state: string, hashMessage: string, signature: string) => {
    try {
      const q = await fetch('https://api.wakanda-labs.com/discord', {
        method: 'POST',
        body: JSON.stringify({
          state: state,
          message: hashMessage,
          signature: signature,
          type: "EVM"
        })
      })
      const res = await q.json()
      if (res && res.address) {
        setSigner(res.address)
        setStatus(SUCCESS)
        setTimeout(() => {
          setStatus(IDLE)
        }, IDLE_DELAY)
      } else {
        setStatus(ERROR)
        setTimeout(() => {
          setStatus(IDLE)
        }, IDLE_DELAY)
      }
    } catch (e) {
      setStatus(ERROR)
      setTimeout(() => {
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  useEffect(() => {
    fetchPayload()
  }, [fetchPayload])

  return (
    <Center>
      <Stack alignItems={"center"} w={['full', 'container.sm']} spacing={6}>
        <Text fontWeight={'bold'} fontSize={'xl'}>Please sign the message below</Text>
        <Code p={4} borderRadius={'12px'} h={'160px'} colorScheme={'pink'} variant={"outline"} w={"full"}>
          {payload.member ? hashMessage : 'loading...'}
        </Code>
        <Text fontSize={'md'} fontWeight={'semibold'}>Never share your seed phrase or private key!</Text>
        <Button
          disabled={!account || !state || !payload.member}
          isLoading={status === PROCESSING}
          p={8}
          onClick={async () => {
            if (state) {
              setStatus(PROCESSING)
              setSigner("")
              const signature = await library?.getSigner().signMessage(hashMessage)
              console.log("hashMessage:", hashMessage)
              console.log("signature:", signature)
              if (hashMessage && signature) {
                await postSignature(state, hashMessage, signature)
              }
            }
          }}>
          Sign Message
        </Button>
        <Divider/>
        {signer && signer === account && (
          <>
            <Text fontSize={'md'} fontWeight={'semibold'}>Okay, you have signed success!</Text>
            <Text fontSize={'xs'} fontWeight={"semibold"}>Now, hand over to our bot: <Text color={'red'}>Wakanda+#0223</Text></Text>
          </>
        )}
      </Stack>
    </Center>
  )
}

export default Verify
