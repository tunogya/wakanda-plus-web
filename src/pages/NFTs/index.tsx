import {Badge, Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";

const NFTs = () => {
  return (
    <Stack bg={'#F0F0F0'} h={'100vh'}>
      <CloseButton backRoute={'/'}/>
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>Wakanda NFTs</Text>
        <Badge color={'black'} fontSize={'xs'} variant={'outline'} borderRadius={'full'} px={2}>Polygon</Badge>
      </VStack>
      <Stack bg={"white"} h={'full'} p={3} borderTopRadius={24} spacing={3}>
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
    </Stack>
  )
}

export default NFTs