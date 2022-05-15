import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.MUMBAI]: "0x50fe6696f260fc815dc3c602b71fe6c991324468",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.MUMBAI]: "0x4009Ff411E6F262D77a6860B26A56538A6744032",
}
