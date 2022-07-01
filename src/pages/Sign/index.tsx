import {Button, Center, Code, Divider, Stack, Text} from "@chakra-ui/react"
import {useActiveWeb3React} from "../../hooks/web3"
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";

const Sign = () => {
  const {library, account} = useActiveWeb3React()
  const [payload, setPayload] = useState({
    guild: null,
    member: null,
    guild_name: null,
    member_tag: null,
  })
  const [signer, setSigner] = useState<undefined | string>()
  const params = useParams()
  const state = params.state
  const [status, setStatus] = useState(IDLE)

  const message = useMemo(() => {
    return `Guild: ${payload.guild_name} Member: ${payload.member_tag}`
  }, [payload])

  const fetchPayload = useCallback(async () => {
    try {
      const q = await fetch(`https://api.wakanda-labs.com/discord?state=${state}`)
      const res = await q.json()
      if (res) {
        setPayload(res)
      }
    } catch (_) {
      setStatus(ERROR)
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
          {payload.member ? message : 'loading...'}
        </Code>
        <Text fontSize={'md'} fontWeight={'semibold'}>Never share your seed phrase or private key!</Text>
        <Button
          disabled={!account || !state || !payload.member}
          isLoading={status === PROCESSING}
          p={8}
          onClick={async () => {
            if (state && library) {
              setStatus(PROCESSING)
              setSigner("")
              try {
                // @ts-ignore
                const signature = await library?.provider.request({
                  method: "personal_sign",
                  params: [message, account]
                })
                console.log("hashMessage:", message)
                console.log("signature:", signature)
                if (message && signature) {
                  await postSignature(state, message, signature)
                }
              } catch (e) {
                setStatus(ERROR)
                setTimeout(() => {
                  setStatus(IDLE)
                }, IDLE_DELAY)
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
        { status === ERROR && (
          <Text fontSize={'md'} fontWeight={'semibold'} color={"red"}>Error...</Text>
        ) }
      </Stack>
    </Center>
  )
}

export default Sign
