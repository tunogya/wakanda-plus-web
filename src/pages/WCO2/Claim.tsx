import {Button, Stack, Text} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {useRewardsContract} from "../../hooks/useContract";
import {REWARDS_ADDRESS} from "../../constants/addresses";
import {SupportedChainId} from "../../constants/chains";
import {useCallback, useEffect, useState} from "react";
import {parseToBigNumber} from "../../utils/bigNumberUtil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";

type Promotion = {
  createdAt: number,
  epochDuration: number,
  numberOfEpochs: number,
  rewardsClaimed: number,
  startTimestamp: number,
  tokensPerEpoch: number,
}

const Claim = () => {
  const {chainId, account} = useActiveWeb3React()
  const Reward = useRewardsContract(REWARDS_ADDRESS[chainId ?? SupportedChainId.MUMBAI], true)
  const [currentEpochId, setCurrentEpochId] = useState(0)
  const [promotion, setPromotion] = useState<Promotion>({
    createdAt: 0,
    epochDuration: 0,
    numberOfEpochs: 0,
    rewardsClaimed: 0,
    startTimestamp: 0,
    tokensPerEpoch: 0
  })
  const [currentReward, setCurrentReward] = useState(0)
  const [status, setStatus] = useState(IDLE)

  const fetchPromotion = useCallback(async () => {
    if (Reward) {
      const res = await Reward.getPromotion(1)
      if (res) {
        setPromotion({
          createdAt: parseToBigNumber(res[3]).toNumber(),
          epochDuration: res[2],
          numberOfEpochs: res[1],
          rewardsClaimed: parseToBigNumber(res[5]).shiftedBy(-18).toNumber(),
          startTimestamp: parseToBigNumber(res[0]).toNumber(),
          tokensPerEpoch: parseToBigNumber(res[4]).shiftedBy(-18).toNumber()
        })
      }
      const res2 = await Reward.getCurrentEpochId(1)
      if (res2) {
        setCurrentEpochId(parseToBigNumber(res2).toNumber())
      }
      if (account && currentEpochId) {
        const res3 = await Reward.getRewardsAmount(account, 1, [currentEpochId])
        setCurrentReward(parseToBigNumber(res3[0]).shiftedBy(-18).toNumber())
      }
    }
  }, [Reward, account])

  const handleClaim = async () => {
    if (account && Reward) {
      setStatus(PROCESSING)
      const q = await Reward.claimReward(account, 1)
      const res = await q.wait()
      switch (res.status) {
        case 0:
          setStatus(ERROR)
          setTimeout(() => {
            setStatus(IDLE)
          }, IDLE_DELAY)
          break;
        case 1:
          setStatus(SUCCESS)
          setTimeout(() => {
            setStatus(IDLE)
          }, IDLE_DELAY)
          break;
        default:
          setStatus(ERROR)
          setTimeout(() => {
            setStatus(IDLE)
          }, IDLE_DELAY)
          break;
      }
    }
  }

  useEffect(() => {
    fetchPromotion()
  }, [fetchPromotion])

  return (
    <Stack p={5} fontSize={'sm'} fontWeight={'semibold'}>
      <Text>createdAt: {new Date(promotion.createdAt * 1000).toLocaleString()}</Text>
      <Text>epochDuration: {promotion.epochDuration} seconds</Text>
      <Text>numberOfEpochs: {currentEpochId}th of {promotion.numberOfEpochs}</Text>
      <Text>startTimestamp: {new Date(promotion.startTimestamp * 1000).toLocaleString()}</Text>
      <Text>tokensPerEpoch: {promotion.tokensPerEpoch} WCO2</Text>
      <Text>rewardsClaimed: {promotion.rewardsClaimed} WCO2</Text>
      { currentReward === 0 ? (
        <Text>nextClaimTime: {new Date((promotion.startTimestamp + (currentEpochId + 1) * promotion.epochDuration)*1000).toLocaleString()}</Text>
      ) : (
        <Text>currentReward: {currentReward} WCO2</Text>
      ) }
      <Button
        disabled={currentReward === 0}
        onClick={handleClaim}
        isLoading={status === PROCESSING}
      >
        {status === IDLE && 'Claim'}
        {status === SUCCESS && 'Success'}
        {status === ERROR && 'Error'}
      </Button>
      <Button
        onClick={()=>{
          fetchPromotion()
        }}
      >
        Refresh
      </Button>
    </Stack>
  )
}

export default Claim