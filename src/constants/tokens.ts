import { Token } from "@uniswap/sdk-core"
import { WCO2_ADDRESS } from "./addresses"
import { SupportedChainId } from "./chains"

export const WCO2: { [chainId: number]: Token } = {
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, WCO2_ADDRESS[4], 18, "WCO2", "Wakanda Carbon Credit"),
}
