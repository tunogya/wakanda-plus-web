import React from "react"
import {Spacer, Stack, Text} from "@chakra-ui/react"
import Web3ReactManager from "../components/Web3ReactManager"

function App() {
  return (
    <Web3ReactManager>
      <Stack h={"100vh"} bg={"#F1F7FA"} direction={"row"} justifyContent={"center"}>
        <Stack w={'400px'} bg={"white"} h={'full'} p={'24px'} spacing={'24px'}>
          <Text fontSize={16} fontWeight={"600"}>Wakanda+</Text>
          <Stack p={8} bg={'#F1F7FA'} direction={'row'} w={"full"} fontSize={24} borderRadius={24} alignItems={"center"}>
            <Text>Hello</Text>
            <Text fontWeight={'600'}>tunogya</Text>
            <Spacer/>
            <Stack h={'48px'} w={'48px'} bg={"white"} borderRadius={'full'}>
            </Stack>
          </Stack>
          <Stack bg={'#30848A'} w={"full"} p={8} borderRadius={24} h={'440px'}>
            <Stack direction={"row"} color={'white'} alignItems={"center"}>
              <Text fontSize={24} fontWeight={600}>WCO2</Text>
              <Spacer/>
              <Text fontSize={16}>0x3820...1234</Text>
            </Stack>
            <Spacer/>
            <Text fontSize={32} fontWeight={600} color={"white"}>10 tCO2e</Text>
          </Stack>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
