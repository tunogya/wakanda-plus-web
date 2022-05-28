import {Button, Stack} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {injected} from "../../connectors";
import CloseButton from "../../components/CloseButton";

const Account = () => {
  const { connector } = useActiveWeb3React()

  return (
    <Stack spacing={2} h={'100vh'}>
      <CloseButton backRoute={'/'} />
      <Stack pt={20} px={3}>
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