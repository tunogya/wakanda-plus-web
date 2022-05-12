import {Button, Divider, HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import {shortenAddress} from "../../utils";
import Identicon from "../../components/Identicon";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useActiveWeb3React} from "../../hooks/web3";
import {injected} from "../../connectors";

const Account = () => {
  const navigate = useNavigate()
  const { chainId, account, connector } = useActiveWeb3React()

  return (
    <Stack spacing={0} h={'100vh'}>
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
      <Divider/>
      <Spacer/>
      <Stack pb={'60px'} px={5}>
        {connector !== injected && (
          <Button
            size={'lg'}
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