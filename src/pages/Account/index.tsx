import {Button, HStack, Stack, Text} from "@chakra-ui/react";
import {shortenAddress} from "../../utils";
import Identicon from "../../components/Identicon";
import {useActiveWeb3React} from "../../hooks/web3";
import {injected} from "../../connectors";
import CloseButton from "../../components/CloseButton";

const Account = () => {
  const { account, connector } = useActiveWeb3React()

  return (
    <Stack spacing={5} h={'100vh'} px={5}>
      <HStack>
        <Identicon/>
        <Text fontWeight={'semibold'}>{shortenAddress(account || '')}</Text>
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

const WrappedAccount = () => {
  return (
    <>
      <CloseButton backRoute={'/'} />
      <Account />
    </>
  )
}

export default WrappedAccount