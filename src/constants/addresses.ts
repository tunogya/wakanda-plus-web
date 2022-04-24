import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x50fE6696f260fC815DC3C602B71fe6C991324468",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0xeB140eb5D040e865a8814205867d710EFeB79a7B",
}
