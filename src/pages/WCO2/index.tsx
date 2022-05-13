import {Badge, Button, Divider, HStack, Stack, Text} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {useCallback, useEffect, useState} from "react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {parseToBigNumber} from "../../utils/bigNumberUtil";
import useInterval from "@use-it/interval";
import {useTokenContract} from "../../hooks/useContract";
import {WCO2_ADDRESS} from "../../constants/addresses";

const WCO2 = () => {
  const {chainId, account} = useActiveWeb3React()
  const WCO2 = useTokenContract(WCO2_ADDRESS[chainId ?? 1])
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate()

  const asyncFetch = useCallback(async () => {
    if (account && WCO2) {
      const b = await WCO2.balanceOf(account)
      if (b) {
        setBalance(parseToBigNumber(b).shiftedBy(-18).toNumber())
      }
    }
  }, [account, WCO2])

  useEffect(() => {
    asyncFetch()
  }, [asyncFetch])

  useInterval(() => {
    asyncFetch()
  }, 10000)


  return (
    <Stack bg={'#F0F0F0'} h={'100vh'}>
      <Stack p={5}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button w={9} h={9} size={'sm'} bg={"white"} alignItems={"center"} justifyContent={"center"}
                  borderRadius={'full'}
                  variant={'ghost'} onClick={() => {
            navigate('/')
          }}>
            <SmallCloseIcon/>
          </Button>
        </Stack>
        <HStack alignItems={"center"} pt={5}>
          <Text fontWeight={'semibold'}>Wakanda Carbon Credit</Text>
          <Badge fontSize={'xs'} variant={'solid'} borderRadius={'full'} px={2}>Polygon</Badge>
        </HStack>
        <Text fontSize={'xs'}>{account}</Text>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>{`${balance} WCO2`}</Text>
      </Stack>
      <Stack bg={"white"} h={'full'} p={3} borderRadius={24} spacing={3} pb={'90px'}>
        <HStack w={'full'} justifyContent={"space-around"} bg={'#F0F0F0'} borderRadius={'full'}>
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
          <Divider orientation={'vertical'} borderColor={'white'}/>
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
      <HStack position={'fixed'} bottom={0} bg={'#F0F0F0'} w={'full'} justifyContent={"space-around"} p={3}
              pb={6} zIndex={'docked'} maxW={'container.md'}>
        <Button
          variant={"ghost"}
          onClick={() => {
            navigate('/wco2/send')
          }}
        >
          Send
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            navigate('/wco2/receive')
          }}
        >
          Receive
        </Button>
      </HStack>
    </Stack>
  )
}

export default WCO2