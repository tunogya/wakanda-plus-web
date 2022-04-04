import { ReactNode, useMemo } from "react"
import { useActiveWeb3React } from "../../hooks/web3"
import { Trans } from "@lingui/macro"

// SDN OFAC addresses
const BLOCKED_ADDRESSES: string[] = []

export default function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return (
      <div>
        <Trans>Blocked address</Trans>
      </div>
    )
  }
  return <>{children}</>
}
