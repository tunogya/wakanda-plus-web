import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x87DB3d434f7321B7Eeb894B0f2aFc7775807374B",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "",
  [SupportedChainId.MUMBAI]: "0x4009Ff411E6F262D77a6860B26A56538A6744032",
}
