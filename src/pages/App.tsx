import React, {useCallback, useEffect, useState} from "react"
import {Button, Spacer, Stack, Text} from "@chakra-ui/react"
import Web3ReactManager from "../components/Web3ReactManager"
import WalletModal from "../components/Web3Status";
import {useCapAndTradeContract, useTokenContract} from "../hooks/useContract";
import {CAPANDTRADE_ADDRESS, WCO2_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "../hooks/web3";
import {formatNumber, parseToBigNumber} from "../utils/bigNumberUtil";
import useInterval from "@use-it/interval";
import {t, Trans} from "@lingui/macro"

function App() {
  const {chainId, account} = useActiveWeb3React()
  const WCO2 = useTokenContract(WCO2_ADDRESS[chainId ?? 1])
  const [balance, setBalance] = useState(0)
  const CapAndTrade = useCapAndTradeContract(CAPANDTRADE_ADDRESS[chainId ?? 1])
  const [year, setYear] = useState(0)
  const [cap, setCap] = useState(0)
  const [myAllowance, setMyAllowance] = useState(0)
  
  const asyncFetch = useCallback(async () => {
    if (account && WCO2) {
      const b = await WCO2.balanceOf(account)
      if (b) {
        setBalance(parseToBigNumber(b).shiftedBy(-18).toNumber())
      }
    }
    if (account && CapAndTrade){
      const timestamp = (Date.now()/1000).toFixed(0)
      const y = await CapAndTrade.yearOf(timestamp)
      setYear(parseToBigNumber(y).toNumber())
      const c = await CapAndTrade.capOf(timestamp)
      setCap(parseToBigNumber(c).shiftedBy(-18).toNumber())
      const a = await CapAndTrade.allowances(account, y)
      setMyAllowance(parseToBigNumber(a).shiftedBy(-18).toNumber())
    }
  }, [account, WCO2, CapAndTrade])
  
  useEffect(() => {
    asyncFetch()
  }, [asyncFetch])
  
  useInterval(()=>{
    asyncFetch()
  }, 10000)
  
  return (
    <Web3ReactManager>
      <Stack h={"100vh"} bg={"#F1F7FA"} direction={"row"} justifyContent={"center"}>
        <Stack w={'400px'} bg={"white"} h={'full'} p={'24px'} spacing={'24px'}>
          <Text fontSize={16} fontWeight={"600"}>Wakanda+</Text>
          <WalletModal/>
          <Stack bg={'#30848A'} w={"full"} p={8} borderRadius={24} h={'440px'}>
            <Stack direction={"row"} color={'white'} alignItems={"center"}>
              <Text fontSize={24} fontWeight={600}>WCO2</Text>
              <Spacer/>
              {/*<Text fontSize={16}>0x3820...1234</Text>*/}
            </Stack>
            <Spacer/>
            <Text fontSize={28} fontWeight={600} color={"white"}>{formatNumber(balance, 2)} tCO2e</Text>
          </Stack>
          {
            myAllowance < cap && (
              <Button h={'80px'} borderRadius={24}>
                <Stack w={"full"}>
                  <Text>
                    <Trans>Claim Carbon Credit</Trans>
                  </Text>
                  <Text fontSize={12} color={"gray"}>{t`Allowance of ${year}: ${formatNumber(cap, 2)} tCO2e`}</Text>
                </Stack>
              </Button>
            )
          }
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
