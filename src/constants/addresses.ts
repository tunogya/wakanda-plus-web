import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x6ECC1384B1Ae112B1f3AA18532aB4AB827A9CDC6",
  [SupportedChainId.POLYGON]: "0x7Fd8e00bba10685794326917e3f1c0B4db2D93F7",
  [SupportedChainId.MUMBAI]: "0x69AaF8D7B596F0b749Ad4852B806420eaB9a0776",
}

export const REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xF57c21b27AEe8fbC0D03aFFd6BA7C9af8552Afd9",
  [SupportedChainId.POLYGON]: "0x4D7183119b56A0a8f58F8418A8EaC763F3f9C588",
  [SupportedChainId.MUMBAI]: "0x5d40CEB28Ca3871d40230fcBCbE08FA385dc6d8d",
}
