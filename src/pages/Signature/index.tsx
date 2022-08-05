import {Button, Center, Divider, Stack, Text, chakra, Textarea} from "@chakra-ui/react"
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
  const [singature, setSingature] = useState("")
  const [content, setContent] = useState({
    user: account,
    message: '',
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
        <Textarea placeholder='Loading...' p={4} borderRadius={"0"} h={"160px"} colorScheme={"pink"} borderColor={"black"}
                  defaultValue={content.message} onChange={(e) => setContent({...content, message: e.target.value})}/>
        <Text fontSize={"md"} fontWeight={"semibold"}>
          Never share your seed phrase or private key!
        </Text>
        <Stack direction={"row"} spacing={4}>
          {account && (
            <Button
              leftIcon={<chakra.img src={ETH_ICON} w={6} h={6}/>}
              disabled={!content.user || !content.message}
              onClick={async () => {
                if (!library || !content.message) return
                setStatus(PROCESSING)
                try {
                  // @ts-ignore
                  const signature = await library?.provider.request({
                    method: "personal_sign",
                    params: [content.message, account],
                  })
                  console.log("message:", content.message)
                  console.log("signature:", signature)
                  setSingature(signature)
                  if (state && content.message && signature) {
                    await postSignature(state, content.message, signature, 'EVM')
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
          {user.loggedIn && (
            <Button
              leftIcon={<chakra.img src={FLOW_ICON} w={6} h={6}/>}
              disabled={!content.user || !content.message}
              onClick={async () => {
                if (!content.message) {
                  return
                }
                setStatus(PROCESSING)
                const MSG = Buffer.from(content.message).toString("hex")
                try {
                  const signature = await fcl.currentUser().signUserMessage(MSG)
                  const isValid = await fcl.AppUtils.verifyUserSignatures(MSG, signature);
                  if (isValid) {
                    if (state && content.message && signature) {
                      await postSignature(state, content.message, signature, 'FLOW')
                    } else {
                      setStatus(SUCCESS)
                      setTimeout(() => {
                        setStatus(IDLE)
                      }, IDLE_DELAY)
                    }
                  } else {
                    setStatus(ERROR)
                    setTimeout(() => {
                      setStatus(IDLE)
                    }, IDLE_DELAY)
                  }
                } catch (e) {
                  console.log(e)
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
          {!account && !user.loggedIn && (
            <Text fontWeight={'semibold'}>Connect wallet first!</Text>
          )}
        </Stack>
        <Divider/>
        <Stack p={'24px'} w={["full", "container.sm"]} borderColor={'black'} border={'1px'} hidden={!singature}>
          <Text fontSize={"xs"}>
            {singature}
          </Text>
        </Stack>
        {status === PROCESSING && (
          <Text fontSize={"md"} fontWeight={"semibold"}>
            Loading...
          </Text>
        )}
        {status === SUCCESS && (
          <>
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Okay, you have signed success!
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
