import { injected, walletconnect } from "../../connectors"
import { SUPPORTED_WALLETS } from "../../constants/wallet"
import { Button, Link, Spacer, Stack, Text, VStack } from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"
import WalletConnectIcon from "../../assets/images/walletConnectIcon.svg"
import Identicon from "../Identicon"
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink"
import { shortenAddress } from "../../utils"

interface AccountDetailsProps {
  openOptions: () => void
}

const AccountDetails = ({ openOptions }: AccountDetailsProps) => {
  const { chainId, account, connector } = useActiveWeb3React()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === "METAMASK"))
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0]
    return (
      <Stack>
        <Text>Connected with {name}</Text>
      </Stack>
    )
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <VStack size={16} alignItems={"center"} justifyContent={"center"} mr={"8px"}>
          <Identicon />
        </VStack>
      )
    } else if (connector === walletconnect) {
      return (
        <VStack size={16} alignItems={"center"} justifyContent={"center"} mr={"8px"}>
          <img src={WalletConnectIcon} alt={"WalletConnect logo"} />
        </VStack>
      )
    }
    return null
  }

  return (
    <Stack spacing={8} h={"full"} pb={2}>
      <Stack direction={"row"} alignItems={"center"}>
        <Stack>
          {formatConnectorName()}
          <Text fontWeight={600}>{account && shortenAddress(account)}</Text>
        </Stack>

        <Spacer />
        {getStatusIcon()}
      </Stack>
      {connector !== injected && (
        <Button
          onClick={() => {
            ;(connector as any).close()
          }}
        >
          Disconnect
        </Button>
      )}
      <Button onClick={openOptions}>Change</Button>
      <Spacer />
      {chainId && account && (
        <Link href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}>View on Explorer</Link>
      )}
    </Stack>
  )
}

export default AccountDetails
