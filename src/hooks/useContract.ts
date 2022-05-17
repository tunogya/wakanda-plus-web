import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../abis/erc20.json"
import ERC20_BYTES32_ABI from "../abis/erc20_bytes32.json"
import Rewards_ABI from "../abis/Rewards.json"
import EIP_2612 from "../abis/eip_2612.json"
import MintableERC20_ABI from "../abis/MintableERC20.json"

import { useMemo } from "react"
import { getContract } from "../utils"
import { Erc20, MintableERC20, Rewards } from "../abis/types"
import { useActiveWeb3React } from "./web3"

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function useRewardsContract(contractAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Rewards>(contractAddress, Rewards_ABI, withSignerIfPossible)
}

export function useMintableERC20Contract(contractAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<MintableERC20>(contractAddress, MintableERC20_ABI, withSignerIfPossible)
}
