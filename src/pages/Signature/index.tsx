import {Button, Center, Code, Divider, Stack, Text, chakra} from "@chakra-ui/react"
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status"
import {useCallback, useEffect, useState} from "react"
import {useActiveWeb3React} from "../../hooks/web3"
import {useParams} from "react-router-dom";
import ETH_ICON from "../../assets/svg/ETH.svg"
import FLOW_ICON from "../../assets/svg/FLOW.svg"
import {useActiveFlowReact} from "../../hooks/flow"
import * as fcl from "@onflow/fcl"

const Signature = () => {
  const {state} = useParams()
  const {library, account} = useActiveWeb3React()
  const {user} = useActiveFlowReact()
  const [status, setStatus] = useState(IDLE)
  const [content, setContent] = useState({
    user: undefined,
    message: undefined,
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
    <Center>
      <Stack alignItems={"center"} w={["full", "container.sm"]} spacing={6}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Please sign the message below
        </Text>
        <Code p={4} borderRadius={"12px"} h={"160px"} colorScheme={"pink"} variant={"outline"} w={"full"}>
          {content.message ?? "loading..."}
        </Code>
        <Text fontSize={"md"} fontWeight={"semibold"}>
          Never share your seed phrase or private key!
        </Text>
        <Stack direction={"row"} spacing={4}>
          {account && (
            <Button
              leftIcon={<chakra.img src={ETH_ICON} w={6} h={6}/>}
              disabled={!state || !content.user}
              onClick={async () => {
                if (!state || !library || !content.message) return
                setStatus(PROCESSING)
                try {
                  // @ts-ignore
                  const signature = await library?.provider.request({
                    method: "personal_sign",
                    params: [content.message, account],
                  })
                  console.log("message:", content.message)
                  console.log("signature:", signature)
                  if (content.message && signature) {
                    await postSignature(state, content.message, signature, 'EVM')
                  }
                } catch (e) {
                  setStatus(ERROR)
                  setTimeout(() => {
                    setStatus(IDLE)
                  }, IDLE_DELAY)
                }

              }}
              h={'64px'}
            >
              Sign Message
            </Button>
          )}
          {user.loggedIn && (
            <Button
              leftIcon={<chakra.img src={FLOW_ICON} w={6} h={6}/>}
              disabled={!state || !content.user}
              onClick={async () => {
                if (!content.message || !state) {
                  return
                }
                setStatus(PROCESSING)
                const MSG = Buffer.from(content.message).toString("hex")
                try {
                  const signature = await fcl.currentUser.signUserMessage(MSG)
                  console.log("message:", content.message)
                  console.log("signature:", signature)
                  if (content.message && signature) {
                    // await postSignature(state, content.message, signature, 'FLOW')
                    const isValid = await fcl.AppUtils.verifyUserSignatures(MSG, signature)
                    console.log(isValid)
                  }
                } catch (e) {
                  console.log(e)
                  setStatus(ERROR)
                  setTimeout(() => {
                    setStatus(IDLE)
                  }, IDLE_DELAY)
                }
              }}
              h={'64px'}
            >
              Sign Message
            </Button>
          )}
          {!account && !user.loggedIn && (
            <Text fontWeight={'semibold'}>Connect wallet first!</Text>
          )}
        </Stack>
        <Divider/>
        {status === PROCESSING && (
          <>
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Loading...
            </Text>
          </>
        )}
        {status === SUCCESS && (
          <>
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Okay, you have signed success!
            </Text>
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              Now, hand over to our bot: <Text color={"red"}>Wakanda+#0223</Text>
            </Text>
          </>
        )}
        {status === ERROR && (
          <Text fontSize={"md"} fontWeight={"semibold"} color={"red"}>
            Error...
          </Text>
        )}
      </Stack>
    </Center>
  )
}

export default Signature
