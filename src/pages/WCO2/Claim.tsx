import {Button, Stack} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {useRewardsContract} from "../../hooks/useContract";
import {REWARDS_ADDRESS} from "../../constants/addresses";
import {SupportedChainId} from "../../constants/chains";

const Claim = () => {
  const { chainId } = useActiveWeb3React()
  const Reward = useRewardsContract(REWARDS_ADDRESS[chainId ?? SupportedChainId.MUMBAI], true)


  return (
    <Stack p={5}>

      <Button>
        Claim
      </Button>
    </Stack>
  )
}

export default Claim