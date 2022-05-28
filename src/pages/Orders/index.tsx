import {Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";
import {useNavigate} from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()

  return (
    <Stack h={'100vh'}>
      <CloseButton backRoute={'/'}/>
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>My Orders</Text>
      </VStack>
      <Stack bg={"#F0F0F0"} h={'full'} p={3} borderTopRadius={24} spacing={3} pb={'90px'}>

      </Stack>
      <Stack position={'fixed'} bottom={0} bg={'white'} py={2} w={"full"} zIndex={'docked'} maxW={'container.lg'}>
        <Stack direction={"row"} justifyContent={"space-around"} w={'full'} pb={'env(safe-area-inset-bottom)'}
               h={12} alignItems={"center"}
               onClick={() => {
                 navigate('/pets/create')
               }}>
          <Text fontWeight={"semibold"}>
            Create
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Orders