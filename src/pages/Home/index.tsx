import {Stack, Text} from "@chakra-ui/react";
import WalletModal from "../../components/Web3Status";
import {formatNumber, parseToBigNumber} from "../../utils/bigNumberUtil";
import React, {useCallback, useEffect, useState} from "react";
import {useActiveWeb3React} from "../../hooks/web3";
import {useTokenContract} from "../../hooks/useContract";
import {WCO2_ADDRESS} from "../../constants/addresses";
import useInterval from "@use-it/interval";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const {chainId, account} = useActiveWeb3React()
  const WCO2 = useTokenContract(WCO2_ADDRESS[chainId ?? 1])
  const [balance, setBalance] = useState<number>(0)
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
    <Stack alignItems={"center"} w={"full"}>
      <Stack w={"full"} maxW={'container.md'} h={"full"} p={3} spacing={3}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} w={'full'}>
          <Text fontSize={16} fontWeight={"600"}>
            Wakanda+
          </Text>
          <WalletModal/>
        </Stack>
        <Stack bg={'#F0F0F0'} w={"full"} borderRadius={12} direction={"row"} justifyContent={"space-around"}>
          {[
            {id: 'WCO2', data: formatNumber(parseToBigNumber(balance)), path: 'wco2'},
            {id: 'NFTs', data: '10', path: 'nfts'},
            {id: 'Pets', data: '1', path: 'pets'},
            {id: 'Orders', data: '0', path: 'orders'},
          ].map((item) => (
            <Stack key={item.id} alignItems={"center"} py={'20px'} cursor={'pointer'} onClick={()=>{
              navigate(item.path)
            }}>
              <Text fontWeight={'semibold'}>{item.data}</Text>
              <Text fontSize={'xs'} color={'#999999'}>{item.id}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Home