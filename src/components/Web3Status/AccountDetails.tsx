import {injected} from "../../connectors"
import {Button, IconButton, Spacer, Stack, Text, chakra} from "@chakra-ui/react"
import {useActiveWeb3React} from "../../hooks/web3"
import {shortenAddress} from "../../utils"
import {useActiveFlowReact} from "../../hooks/flow";
import * as fcl from "@onflow/fcl";
import {CloseIcon} from "@chakra-ui/icons";
import ETH_ICON from "../../assets/svg/ETH.svg"
import FLOW_ICON from "../../assets/svg/FLOW.svg"

interface AccountDetailsProps {
  openOptions: () => void
}

const AccountDetails = ({openOptions}: AccountDetailsProps) => {
  const {account, connector} = useActiveWeb3React()
  const {user} = useActiveFlowReact()

  return (
    <Stack spacing={8} h={"full"} pb={4}>
      {account && (
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <chakra.img src={ETH_ICON} h={5} w={5}/>
          <Text>{shortenAddress(account)}</Text>
          <Spacer/>
          {connector !== injected && (
            <IconButton
              size={'xs'}
              aria-label={'Log Out'}
              icon={<CloseIcon/>}
              onClick={() => {
                ;(connector as any).close()
              }}
            />
          )}
        </Stack>
      )}
      {user.loggedIn && (
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <chakra.img src={FLOW_ICON} h={5} w={5}/>
          <Text>{user?.addr ?? "No Address"}</Text>
          <Spacer/>
          <IconButton
            size={'xs'}
            aria-label={'Log Out'}
            icon={<CloseIcon/>}
            onClick={fcl.unauthenticate}
          />
        </Stack>
      )}
      <Button onClick={openOptions} h={"60px"} variant={'outline'}>Connect Wallet</Button>
    </Stack>
  )
}

export default AccountDetails
