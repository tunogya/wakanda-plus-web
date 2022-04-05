import { useEffect, useRef } from "react"

import styled from "styled-components/macro"

import { useActiveWeb3React } from "../../hooks/web3"
import Jazzicon from "@metamask/jazzicon"

const StyledIdenticonContainer = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  background-color: ${({ theme }) => theme.bg4};
`

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
  return <StyledIdenticonContainer ref={ref as any} />
}
