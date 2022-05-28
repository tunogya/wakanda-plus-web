import {Badge, Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";

const NFTs = () => {
  return (
    <Stack h={'100vh'}>
      <CloseButton backRoute={'/'}/>
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>Wakanda NFTs</Text>
        <Badge color={'black'} fontSize={'xs'} variant={'outline'} borderRadius={'full'} px={2}>Polygon</Badge>
      </VStack>
      <Stack bg={"#F0F0F0"} h={'full'} p={5} borderTopRadius={24} spacing={4}>
        <Stack bg={'white'} minH={40} borderRadius={12} p={5}>
          <Text fontWeight={"semibold"}>
            Wakanda Pass
          </Text>
        </Stack>
        <Stack bg={'white'} minH={40} borderRadius={12} p={5}>
          <Text fontWeight={"semibold"}>
            Wakanda Moments
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default NFTs