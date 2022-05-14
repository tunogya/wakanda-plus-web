import {Button, HStack, Stack, Text} from "@chakra-ui/react";
import {shortenAddress} from "../../utils";
import Identicon from "../../components/Identicon";
import {useActiveWeb3React} from "../../hooks/web3";
import {injected} from "../../connectors";
import CloseButton from "../../components/CloseButton";

const Account = () => {
  const { account, connector } = useActiveWeb3React()

  return (
    <Stack spacing={2} h={'100vh'}>
      <CloseButton backRoute={'/'} />
      <HStack px={3}>
        <Identicon/>
        <Text fontWeight={'semibold'}>{shortenAddress(account || '')}</Text>
      </HStack>
      <Stack pt={1} px={3}>
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