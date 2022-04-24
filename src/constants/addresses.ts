import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x50fE6696f260fC815DC3C602B71fe6C991324468",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x12f5721E09Db3f14aAA8876d50f58f5EA17D9780",
}
