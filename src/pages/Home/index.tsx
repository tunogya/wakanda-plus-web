import {Spacer, Stack, Text} from "@chakra-ui/react";
import {formatNumber} from "../../utils/bigNumberUtil";
import React from "react";
import {useNavigate} from "react-router-dom";
import WalletAvatar from "../../components/Web3Status/WalletAvatar";
import ControlBar from "../../components/ControlBar";
import NetworkCard from "../../components/NetworkCard";
import useWCO2 from "../../hooks/useWCO2";

const Home = () => {
  const navigate = useNavigate()
  const {balance} = useWCO2()

  return (
    <Stack spacing={5} px={3} pt={14}>
      <Stack bg={'#F0F0F0'} w={"full"} borderRadius={12} direction={"row"} justifyContent={"space-around"}>
        {[
          {id: 'WCO2', data: formatNumber(balance.shiftedBy(-18), 2), path: 'wco2'},
          {id: 'Pass', data: '0', path: 'pass'},
        ].map((item) => (
          <Stack key={item.id} alignItems={"center"} py={4} cursor={'pointer'} onClick={()=>{
            navigate(item.path)
          }}>
            <Text fontWeight={'semibold'}>{item.data}</Text>
            <Text fontSize={'xs'} color={'#999999'}>{item.id}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

const WrappedHome = () => {
  return (
    <>
      <Stack position={'fixed'} zIndex={'docked'} pt={'env(safe-area-inset-top)'} w={'full'} bg={"white"} maxW={'container.lg'} px={3}>
        <Stack direction={"row"} alignItems={"center"} w={'full'} pt={2}>
          <Text fontWeight={'semibold'} fontSize={'lg'}>Wakanda+</Text>
          <Spacer/>
          <NetworkCard />
          <WalletAvatar />
        </Stack>
      </Stack>
      <Home />
      <ControlBar />
    </>
  )
}

export default WrappedHome