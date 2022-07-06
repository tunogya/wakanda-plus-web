import {Button, Code, Divider, Stack, Text} from "@chakra-ui/react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useActiveWeb3React} from "../../hooks/web3";

const Signature:FC<{state: string}> = ({state}) => {
  const {library, account} = useActiveWeb3React()
  const [signer, setSigner] = useState<undefined | string>()
  const [status, setStatus] = useState(IDLE)
  const [content, setContent] = useState({
    user: undefined,
    message: undefined
  })

  const fetchPayload = useCallback(async () => {
    if (!state) return
    try {
      const q = await fetch(`https://wakandaplusapi.wakanda-labs.com/?state=${state}`)
      const res = await q.json()
      if (res) {
        setContent(res)
      }
    } catch (_) {
      setStatus(ERROR)
    }
  }, [state])

  const postSignature = async (state: string, message: string, signature: string) => {
    try {
      const q = await fetch('https://wakandaplusapi.wakanda-labs.com/', {
        method: 'POST',
        body: JSON.stringify({
          state: state,
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
    <Stack alignItems={"center"} w={['full', 'container.sm']} spacing={6}>
      <Text fontWeight={'bold'} fontSize={'xl'}>Please sign the message below</Text>
      <Code p={4} borderRadius={'12px'} h={'160px'} colorScheme={'pink'} variant={"outline"} w={"full"}>
        {content.message ?? 'loading...'}
      </Code>
      <Text fontSize={'md'} fontWeight={'semibold'}>Never share your seed phrase or private key!</Text>
      <Button
        disabled={!account || !state || !content.user}
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
                params: [content.message, account]
              })
              console.log("message:", content.message)
              console.log("signature:", signature)
              if (content.message && signature) {
                await postSignature(state, content.message, signature)
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
  )
}

export default Signature