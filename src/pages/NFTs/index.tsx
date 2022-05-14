import {Badge, Button, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";

const NFTs = () => {
  return (
    <Stack bg={'#F0F0F0'} h={'100vh'}>
      <CloseButton backRoute={'/'} />
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'}>Wakanda NFTs</Text>
        <Badge fontSize={'xs'} variant={'solid'} borderRadius={'full'} px={2}>Polygon</Badge>
      </VStack>
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
      <HStack position={'fixed'} bottom={0} bg={'#F0F0F0'} w={'full'} justifyContent={"space-around"} pt={2} pb={'env(safe-area-inset-bottom)'}
              zIndex={'docked'} maxW={'container.lg'}
      >
        <Button variant={"ghost"}>
          Receive
        </Button>
      </HStack>
    </Stack>
  )
}

export default NFTs