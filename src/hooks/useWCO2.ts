import {useActiveWeb3React} from "./web3";
import {useMintableERC20Contract} from "./useContract";
import {WCO2_ADDRESS} from "../constants/addresses";
import {useCallback, useEffect} from "react";
import {parseToBigNumber} from "../utils/bigNumberUtil";
import useInterval from "@use-it/interval";
import BigNumber from "bignumber.js";
import {atom, useRecoilState} from "recoil";
import {ZERO_ADDRESS} from "../constants/misc";

const wco2BalanceAtom = atom({
  key: 'my:wco2:balance',
  default: new BigNumber(0)
})

const wco2BurnedAtom = atom({
  key: 'my:wco2:burned',
  default: new BigNumber(0)
})

const wco2TotalSupplyAtom = atom({
  key: 'my:wco2:totalSupply',
  default: new BigNumber(0)
})

const useWCO2 = () => {
  const {chainId, account} = useActiveWeb3React()
  const WCO2 = useMintableERC20Contract(WCO2_ADDRESS[chainId ?? 1])
  const [balance, setBalance] = useRecoilState(wco2BalanceAtom)
  const [burned, setBurned] = useRecoilState(wco2BurnedAtom)
  const [totalSupply, setTotalSupply] = useRecoilState(wco2TotalSupplyAtom)

  const asyncFetch = useCallback(async () => {
    if (account && WCO2) {
      const balanceRes = await WCO2.balanceOf(account)
      const burnedRes = await WCO2.balanceOf(ZERO_ADDRESS)
      const totalSupplyRes = await WCO2.totalSupply()
      if (balanceRes) {
        setBalance(parseToBigNumber(balanceRes))
      }
      if (burnedRes) {
        setBurned(parseToBigNumber(burnedRes))
      }
      if (totalSupplyRes) {
        setTotalSupply(parseToBigNumber(totalSupplyRes))
      }
    }
  }, [account, WCO2])

  useEffect(() => {
    asyncFetch()
  }, [asyncFetch])

  useInterval(() => {
    asyncFetch()
  }, 10000)

  return {
    balance,
    burned,
    totalSupply,
  }
}

export default useWCO2