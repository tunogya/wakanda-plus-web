import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.MUMBAI]: "0x69AaF8D7B596F0b749Ad4852B806420eaB9a0776",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.MUMBAI]: "0x5d40CEB28Ca3871d40230fcBCbE08FA385dc6d8d",
}
