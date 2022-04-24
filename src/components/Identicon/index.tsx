import { useEffect, useRef } from "react"
import { useActiveWeb3React } from "../../hooks/web3"
import Jazzicon from "@metamask/jazzicon"
import {Box} from "@chakra-ui/react";

export default function Identicon() {
  const ref = useRef<HTMLDivElement>()

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ""
      ref.current.appendChild(Jazzicon(48, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <Box h={'48px'} w={'48px'} borderRadius={'full'} ref={ref as any} />
}
