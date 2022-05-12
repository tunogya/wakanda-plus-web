import {Stack, Text} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";

const Account = () => {
  const {account, connector, activate} = useWeb3React()

  return (
    <Stack>
      <Text>{account}</Text>
    </Stack>
  )
}

export default Account