import {Button, Text} from "@chakra-ui/react";
import {formatNumber, parseToBigNumber} from "../../utils/bigNumberUtil";
import React, {useCallback, useEffect, useState} from "react";
import {useRewardsContract} from "../../hooks/useContract";
import {REWARDS_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";

const ClaimButton = () => {
  const {chainId, account} = useActiveWeb3React()
  const Rewards = useRewardsContract(REWARDS_ADDRESS[chainId ?? 1])
  const [award, setAward] = useState<number | undefined>(undefined)
  const [epochID, setEpochID] = useState<number | undefined>(undefined)
  const [status, setStatus] = useState(IDLE)

  const claim = async () => {
    if (account && Rewards) {
      setStatus(PROCESSING)
      const q = await Rewards.claimReward(account, 1)
      const res = await q.wait()
      switch (res.status) {
        case 0:
          setInterval(()=>{
            setStatus(IDLE)
          }, IDLE_DELAY)
          setStatus(ERROR)
          asyncFetch()
          break;
        case 1:
          setInterval(()=>{
            setStatus(IDLE)
          }, IDLE_DELAY)
          setStatus(SUCCESS)
          asyncFetch()
          break;
        default:
          setInterval(()=>{
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

  return (
    <>
      {account && !!award ? (
        <Button
          onClick={claim}
          isLoading={status === PROCESSING}
          loadingText={"Claiming..."}
        >
          <Text>
            Claim Rewards: {formatNumber(parseToBigNumber(award ?? 'NaN').shiftedBy(-18))} WCO2
          </Text>
        </Button>
      ) : (
        <Button variant={"outline"}>
          <Text>Next Claim: </Text>
        </Button>
      )}
    </>
  )
}

export default ClaimButton