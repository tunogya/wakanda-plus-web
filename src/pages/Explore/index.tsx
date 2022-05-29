import {Stack, Text} from "@chakra-ui/react";
import ControlBar from "../../components/ControlBar";
import React from "react";

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

  return (
    <>
      <Stack position={'fixed'} w={'full'} px={3} pt={'env(safe-area-inset-top)'} bg={"white"}>
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} w={'full'} h={'48px'} pt={2}>
          <Text fontWeight={'semibold'} fontSize={'lg'}>Explore</Text>
        </Stack>
      </Stack>
      <Explore/>
      <ControlBar/>
    </>
  )
}

export default WrappedExplore