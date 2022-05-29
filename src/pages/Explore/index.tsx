import {Button, HStack, Stack, Text, useMediaQuery} from "@chakra-ui/react";
import ControlBar, {menuList} from "../../components/ControlBar";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import NetworkCard from "../../components/NetworkCard";
import WalletAvatar from "../../components/Web3Status/WalletAvatar";

const Explore = () => {
  return (
    <Stack
      pt={12}
      px={3}
      minH={'90vh'}
    >
      <Text>type:</Text>
    </Stack>
  )
}

const WrappedExplore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)')

  return (
    <>
      <Stack position={'fixed'} w={'full'} px={3} pt={'env(safe-area-inset-top)'} bg={"white"} maxW={'container.lg'}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} w={'full'} h={'48px'} pt={2}>
          <Text fontWeight={'semibold'} fontSize={'lg'} w={'200px'}>Explore</Text>
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
          { isLargerThan1000 && (
            <HStack w={'200px'} justifyContent={"end"}>
              <NetworkCard />
              <WalletAvatar />
            </HStack>
          ) }
        </Stack>
      </Stack>
      <ControlBar/>
      <Explore/>
    </>
  )
}

export default WrappedExplore