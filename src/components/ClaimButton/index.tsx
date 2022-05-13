import {Button, Text} from "@chakra-ui/react";
import {formatNumber, parseToBigNumber} from "../../utils/bigNumberUtil";
import React, {useCallback, useEffect, useState} from "react";
import {useRewardsContract} from "../../hooks/useContract";
import {REWARDS_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";

type PromoteInfo = {
  startTimestamp: number,
  numberOfEpochs: number,
  epochDuration: number,
  createdAt: number,
  tokensPerEpoch: number,
  rewardsClaimed: number,
} | undefined

const ClaimButton = () => {
  const {chainId, account} = useActiveWeb3React()
  const Rewards = useRewardsContract(REWARDS_ADDRESS[chainId ?? 1])
  const [award, setAward] = useState<number | undefined>(undefined)
  const [epochID, setEpochID] = useState<number | undefined>(undefined)
  const [status, setStatus] = useState(IDLE)
  const [info, setInfo] = useState<PromoteInfo>(undefined)
  const [nextTime, setNextTime] = useState(0)

  const claim = async () => {
    if (account && Rewards) {
      setStatus(PROCESSING)
      const q = await Rewards.claimReward(account, 1)
      const res = await q.wait()
      switch (res.status) {
        case 0:
          setInterval(() => {
            setStatus(IDLE)
          }, IDLE_DELAY)
          setStatus(ERROR)
          asyncFetch()
          break;
        case 1:
          setInterval(() => {
            setStatus(IDLE)
          }, IDLE_DELAY)
          setStatus(SUCCESS)
          asyncFetch()
          break;
        default:
          setInterval(() => {
            setStatus(IDLE)
          }, IDLE_DELAY)
          setStatus(ERROR)
          asyncFetch()
          break;
      }
    }
  }

  const asyncFetch = useCallback(async () => {
    if (Rewards) {
      const e = await Rewards.getCurrentEpochId(1)
      if (e) {
        setEpochID(parseToBigNumber(e).toNumber())
      }
      const i = await Rewards.getPromotion(1)
      if (i) {
        setInfo({
          createdAt: parseToBigNumber(i[3]).toNumber(),
          startTimestamp: parseToBigNumber(i[0]).toNumber(),
          numberOfEpochs: parseToBigNumber(i[1]).toNumber(),
          rewardsClaimed: parseToBigNumber(i[5]).toNumber(),
          epochDuration: parseToBigNumber(i[2]).toNumber(),
          tokensPerEpoch: parseToBigNumber(i[4]).toNumber(),
        })
      }
    }
    if (account && Rewards && epochID !== undefined) {
      const amounts = await Rewards.getRewardsAmount(account, 1, [epochID])
      if (amounts[0]) {
        setAward(parseToBigNumber(amounts[0]).toNumber())
      }
    }
  }, [account, Rewards, epochID])

  useEffect(() => {
    asyncFetch()
  }, [asyncFetch])

  const calculateLeftTime = useCallback(() => {
    if (info) {
      const d = Math.floor(Date.now() / 1000) - info.startTimestamp
      const currentEpochId = Math.floor(d / info.epochDuration)
      if (currentEpochId <= info.numberOfEpochs) {
        const nextClaimStartAt = info.startTimestamp + (currentEpochId + 1) * info.epochDuration
        setNextTime(nextClaimStartAt * 1000)
      }
    }
  }, [info])

  useEffect(() => {
    calculateLeftTime()
  }, [calculateLeftTime])

  return (
    <>
      {account && !!award ? (
        <Button
          onClick={claim}
          size={'lg'}
          isLoading={status === PROCESSING}
          loadingText={"Claiming..."}
        >
          <Text>
            Claim Rewards: {formatNumber(parseToBigNumber(award ?? 'NaN').shiftedBy(-18))} WCO2
          </Text>
        </Button>
      ) : (
        <Button variant={"outline"} disabled size={'lg'}>
          <Text>Next Claim:  {new Date(nextTime).toLocaleString()}</Text>
        </Button>
      )}
    </>
  )
}

export default ClaimButton