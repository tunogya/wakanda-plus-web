import {injected} from "../../connectors"
import {Button, Spacer, Stack, Text} from "@chakra-ui/react"
import {useActiveWeb3React} from "../../hooks/web3"
import {shortenAddress} from "../../utils"
import {useActiveFlowReact} from "../../hooks/flow";
import * as fcl from "@onflow/fcl";

interface AccountDetailsProps {
  openOptions: () => void
}

const AccountDetails = ({openOptions}: AccountDetailsProps) => {
  const {account, connector} = useActiveWeb3React()
  const {user} = useActiveFlowReact()

  return (
    <Stack spacing={8} h={"full"} pb={4}>
      { account && (
        <Stack direction={"row"} alignItems={"center"}>
          <Text fontWeight={"semibold"}>{shortenAddress(account)}</Text>
          <Spacer/>
          {connector !== injected && (
            <Button
              onClick={() => {
                ;(connector as any).close()
              }}
            >
              Log Out
            </Button>
          )}
        </Stack>
      ) }
      {user.loggedIn && (
        <Stack direction={"row"} alignItems={"center"}>
          <Text fontWeight={"semibold"}>{user?.addr ?? "No Address"}</Text>
          <Spacer/>
          <Button
            variant={"ghost"}
            onClick={fcl.unauthenticate}
          >
            Log Out
          </Button>
        </Stack>
      )}
      <Button onClick={openOptions} h={"60px"} variant={'outline'}>Connect Wallet</Button>
    </Stack>
  )
}

export default AccountDetails
