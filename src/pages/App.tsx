import React, {useCallback, useEffect, useState} from "react"
import {Button, Spacer, Stack, Text} from "@chakra-ui/react"
import Web3ReactManager from "../components/Web3ReactManager"
import WalletModal from "../components/Web3Status"
import {useRewardsContract, useTokenContract} from "../hooks/useContract"
import {REWARDS_ADDRESS, WCO2_ADDRESS} from "../constants/addresses"
import {useActiveWeb3React} from "../hooks/web3"
import {formatNumber, parseToBigNumber} from "../utils/bigNumberUtil"
import useInterval from "@use-it/interval"
import NetworkCard from "../components/Web3Status/NetworkCard"

function App() {
  const {chainId, account} = useActiveWeb3React()
  const WCO2 = useTokenContract(WCO2_ADDRESS[chainId ?? 1])
  const Rewards = useRewardsContract(REWARDS_ADDRESS[chainId ?? 1])
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [epochID, setEpochID] = useState<number | undefined>(undefined)
  const [award, setAward] = useState<number | undefined>(undefined)

  const asyncFetch = useCallback(async () => {
    if (account && WCO2) {
      const b = await WCO2.balanceOf(account)
      if (b) {
        setBalance(parseToBigNumber(b).shiftedBy(-18).toNumber())
      }
    }
    if (Rewards) {
      const e = await Rewards.getCurrentEpochId(1)
      if (e) {
        setEpochID(parseToBigNumber(e).toNumber())
      }
    }
    if (account && Rewards && epochID) {
      const amounts = await Rewards.getRewardsAmount(account, 1, [epochID])
      if (amounts[0]){
        setAward(amounts[0])
      }
    }
  }, [account, WCO2, Rewards, epochID])

  const claim = async () => {
    if (account && Rewards) {
      const q = await Rewards.claimReward(account, 1)
      const res = await q.wait()
      console.log(res)
    }
  }

  useEffect(() => {
    asyncFetch()
  }, [asyncFetch])

  useInterval(() => {
    asyncFetch()
  }, 10000)

  return (
    <Web3ReactManager>
      <Stack h={"100vh"} bg={"bg1"} direction={"row"} justifyContent={"center"}>
        <Stack w={"400px"} bg={"white"} h={"full"} p={"24px"} spacing={"24px"}>
          <Stack direction={"row"}>
            <Text fontSize={16} fontWeight={"600"}>
              Wakanda+
            </Text>
            <Spacer/>
            <NetworkCard/>
          </Stack>
          <WalletModal/>
          <Stack bg={"bg2"} w={"full"} p={8} borderRadius={24} h={"440px"}>
            <Stack direction={"row"} color={"white"} alignItems={"center"}>
              <Text fontSize={24} fontWeight={600}>
                WCO2
              </Text>
              <Spacer/>
              { epochID && (
                <Text fontSize={16}>Epoch {epochID}</Text>
              ) }
            </Stack>
            <Spacer/>
            {balance !== undefined && (
              <Text fontSize={28} fontWeight={600} color={"white"}>
                {formatNumber(balance, 2)} tCO2e
              </Text>
            )}
          </Stack>
          { account && award && (
            <Button
              h={"80px"}
              borderRadius={24}
              onClick={claim}
              loadingText={"Claiming..."}
            >
              <Text>
                Claim Rewards: {formatNumber(parseToBigNumber(award ?? 'NaN').shiftedBy(-18))} WCO2
              </Text>
            </Button>
          ) }
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
