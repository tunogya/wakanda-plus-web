import { Badge, Link } from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"
import { CHAIN_INFO, SupportedChainId } from "../../constants/chains"

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined

  if (!chainId || chainId === SupportedChainId.MAINNET || !info || !library) {
    return null
  }

  return (
    <Link href={info.infoLink}>
      <Badge>{info.label}</Badge>
    </Link>
  )
}

export default NetworkCard
