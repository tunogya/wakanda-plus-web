import {Button, Divider, Stack, Text, Textarea} from "@chakra-ui/react"
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status"
import {useCallback, useEffect, useState} from "react"
import {useActiveWeb3React} from "../../hooks/web3"
import {useParams} from "react-router-dom";

const Signature = () => {
  const {state} = useParams()
  const {library, account} = useActiveWeb3React()
  const [status, setStatus] = useState(IDLE)
  const [signature, setSignature] = useState("")
  const [message, setMessage] = useState("")

  const fetchPayload = useCallback(async () => {
    if (!state) return
    try {
      const q = await fetch(`https://wakandaplusapi.wakanda-labs.com/?state=${state}`)
      const res = await q.json()
      if (res?.message) {
        setMessage(res.message)
      }
    } catch (_) {
      setStatus(ERROR)
    }
  }, [state])

  const postSignature = async (state: string, message: string, signature: string, type: string) => {
    try {
      const q = await fetch("https://wakandaplusapi.wakanda-labs.com/", {
        method: "POST",
        body: JSON.stringify({
          state: state,
          signature: signature,
          type: type,
        }),
      })
      const res = await q.json()
      if (res && res.address) {
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
    <Stack spacing={'24px'} align={"center"}>
      <Stack alignItems={"center"} w={["full", "container.sm"]} spacing={6} borderColor={"black"} py={'24px'} border={'1px'}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Sign Message
        </Text>
        <Stack w={'full'} px={'24px'}>
          <Textarea placeholder='Loading...' p={4} borderRadius={"0"} h={"160px"} colorScheme={"pink"} variant={'outline'}
                    borderColor={'black'}
                    defaultValue={message} onChange={(e) => setMessage(e.target.value)}/>
        </Stack>
        <Text fontSize={"xs"}>
          Never share your seed phrase or private key!
        </Text>
        <Stack direction={"row"} spacing={4}>
          {account && (
            <Button
              bg={"rgb(122, 74, 221)"} color={"white"}
              disabled={!message}
              onClick={async () => {
                if (!library || !message) return
                setStatus(PROCESSING)
                try {
                  // @ts-ignore
                  const signature = await library?.provider.request({
                    method: "personal_sign",
                    params: [message, account],
                  })
                  console.log("message:", message)
                  console.log("signature:", signature)
                  setSignature(signature)
                  if (state && message && signature) {
                    await postSignature(state, message, signature, 'EVM')
                  } else {
                    setStatus(SUCCESS)
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
              }}
            >
              Sign Message
            </Button>
          )}
          {!account && (
            <Text fontWeight={'semibold'}>Connect wallet first!</Text>
          )}
        </Stack>
        <Divider/>
        <Stack p={'24px'} w={["full", "container.sm"]}>
          <Text fontSize={"xs"}>
            {signature}
          </Text>
        </Stack>
        <Divider/>
        {status === PROCESSING && (
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Loading...
          </Text>
        )}
        {status === SUCCESS && (
          <>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              Okay, you have signed success!
            </Text>
          </>
        )}
        {status === ERROR && (
          <Text fontSize={"sm"} fontWeight={"semibold"} color={"red"}>
            Error...
          </Text>
        )}
      </Stack>
    </Stack>
  )
}

export default Signature
