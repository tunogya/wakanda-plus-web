import {Badge, Button, HStack, Stack, Text} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

const NFTs = () => {
  const {account} = useActiveWeb3React()
  const navigate = useNavigate()

  return (
    <Stack bg={'#F0F0F0'} h={'100vh'}>
      <Stack p={5}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button w={9} h={9} size={'sm'} bg={"white"} alignItems={"center"} justifyContent={"center"} borderRadius={'full'}
                  variant={'ghost'} onClick={() => {
            navigate('/')
          }}>
            <SmallCloseIcon/>
          </Button>
        </Stack>
        <HStack alignItems={"center"} pt={5}>
          <Text fontWeight={'semibold'}>Wakanda NFTs</Text>
          <Badge fontSize={'xs'} variant={'solid'} borderRadius={'full'} px={2}>Polygon</Badge>
        </HStack>
        <Text fontSize={'xs'}>{account}</Text>
      </Stack>
      <Stack bg={"white"} h={'full'} p={3} borderRadius={24} spacing={3} pb={'90px'}>
        <Stack bg={'#F0F0F0'} minH={40} borderRadius={12} p={5}>
          <Text fontWeight={"semibold"}>
            Wakanda Pass
          </Text>
        </Stack>
        <Stack bg={'#F0F0F0'} minH={40} borderRadius={12} p={5}>
          <Text fontWeight={"semibold"}>
            Wakanda Moments
          </Text>
        </Stack>
      </Stack>
      <HStack position={'fixed'} bottom={0} bg={'#F0F0F0'} w={'full'} justifyContent={"space-around"} p={'11px'}
              pb={'22px'} zIndex={'docked'} maxW={'container.md'}>
        <Button variant={"ghost"}>
          Receive
        </Button>
      </HStack>
    </Stack>
  )
}

export default NFTs