import {Badge, Button, Divider, HStack, Stack, Text} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {useNavigate} from "react-router-dom";
import {formatNumber} from "../../utils/bigNumberUtil";
import CloseButton from "../../components/CloseButton";
import useWCO2 from "../../hooks/useWCO2";
import {WCO2_ADDRESS} from "../../constants/addresses";
import {shortenAddress} from "../../utils";

const WCO2 = () => {
  const navigate = useNavigate()
  const {balance} = useWCO2()
  const {chainId} = useActiveWeb3React()

  return (
    <Stack h={'100vh'} spacing={0}>
      <CloseButton backRoute={'/'}/>
      <Stack p={5}>
        <HStack alignItems={"center"} pt={10}>
          <Text fontWeight={'semibold'}>Wakanda Carbon Credit</Text>
          <Badge color={'black'} fontSize={'xs'} variant={'outline'} borderRadius={'full'} px={2}>Polygon</Badge>
        </HStack>
        <Text fontSize={'xs'} whiteSpace={"nowrap"}>Token: {shortenAddress(WCO2_ADDRESS[chainId ?? 1], 8)}</Text>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>{`${formatNumber(balance.shiftedBy(-18), 2)} WCO2`}</Text>
      </Stack>
      <Stack bg={'#F0F0F0'} h={'full'} p={5} borderTopRadius={24} spacing={3}>
        <HStack w={'full'} justifyContent={"space-around"} bg={'white'} borderRadius={'full'}>
          <Button
            variant={"ghost"}
            w={'full'}
            fontSize={'sm'}
            onClick={() => {
              navigate('/wco2/claim')
            }}
          >
            Claim
          </Button>
          <Divider orientation={'vertical'} borderColor={'#F0F0F0'}/>
          <Button
            variant={"ghost"}
            w={'full'}
            fontSize={'sm'}
            onClick={() => {
              navigate('/wco2/burn')
            }}
          >
            Burn
          </Button>
        </HStack>
        <Text>No transaction</Text>
      </Stack>
    </Stack>
  )
}

export default WCO2