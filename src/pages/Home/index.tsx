import {Button, HStack, Stack, Text, useMediaQuery} from "@chakra-ui/react";
import {formatNumber} from "../../utils/bigNumberUtil";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import WalletAvatar from "../../components/Web3Status/WalletAvatar";
import ControlBar, {menuList} from "../../components/ControlBar";
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
  const navigate = useNavigate()
  const location = useLocation()
  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)')

  return (
    <>
      <Stack position={'fixed'} zIndex={'docked'} pt={'env(safe-area-inset-top)'} w={'full'} bg={"white"} maxW={'container.lg'} px={3}>
        <Stack direction={"row"} alignItems={"center"} w={'full'} pt={2} justifyContent={"space-between"}>
          <Text fontWeight={'semibold'} fontSize={'lg'} w={'200px'}>Wakanda+</Text>
          { isLargerThan1000 && (
            <Stack alignItems={"center"} justifyContent={"center"}>
              <HStack h={'36px'} bg={"#F0F0F0"} px={10} borderRadius={'12px'} spacing={10}>
                {menuList.map((item) => (
                  <Button
                    key={item.id}
                    variant={"ghost"}
                    onClick={() => {
                      navigate(item.path)
                    }}
                    color={location.pathname === item.path ? "black" : "#c4c4c4"}
                  >
                    {item.id}
                  </Button>
                ))}
              </HStack>
            </Stack>
          ) }
          <HStack w={'200px'} justifyContent={"end"}>
            <NetworkCard />
            <WalletAvatar />
          </HStack>
        </Stack>
      </Stack>
      <ControlBar />
      <Home />
    </>
  )
}

export default WrappedHome