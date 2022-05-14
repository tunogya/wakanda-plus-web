import {Button, Divider, HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import {shortenAddress} from "../../utils";
import Identicon from "../../components/Identicon";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useActiveWeb3React} from "../../hooks/web3";
import {injected} from "../../connectors";
import {useEffect} from "react";

const Account = () => {
  const navigate = useNavigate()
  const { account, connector } = useActiveWeb3React()

  useEffect(()=>{
    if (!account) {
      navigate('/login')
    }
  }, [account])

  return (
    <Stack spacing={5} h={'100vh'}>
      <HStack p={5}>
        <Identicon/>
        <Text fontWeight={'semibold'}>{shortenAddress(account || '')}</Text>
        <Spacer/>
        <Button w={9} h={9} size={'sm'} bg={"#c5c5c5"} color={'white'} alignItems={"center"} justifyContent={"center"}
                borderRadius={'full'}
                variant={'ghost'} onClick={() => {
          navigate('/')
        }}>
          <SmallCloseIcon/>
        </Button>
      </HStack>
      <Stack pb={'60px'} px={5}>
        {connector !== injected && (
          <Button
            size={'lg'}
            variant={'outline'}
            onClick={() => {
              ;(connector as any).close()
            }}
          >
            Disconnect
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

export default Account