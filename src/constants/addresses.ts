import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x50fE6696f260fC815DC3C602B71fe6C991324468",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x7557fa27d94fc3446619163d2715df804164acef",
}
