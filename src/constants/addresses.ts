import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const WCO2_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x9c8Cf50644d8925F157a23Ed7141706ea8D14E25',
}

export const CAPANDTRADE_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x38c04D343e9fEbB9D2A0F83531B4849C035f28f1',
}