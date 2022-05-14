import {Button, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";
import {useNavigate} from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()

  return (
    <Stack bg={'#F0F0F0'} h={'100vh'}>
      <CloseButton backRoute={'/'} />
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'}>My Orders</Text>
      </VStack>
      <Stack bg={"white"} h={'full'} p={3} borderRadius={24} spacing={3} pb={'90px'}>

      </Stack>
      <HStack position={'fixed'} bottom={0} bg={'#F0F0F0'} w={'full'} justifyContent={"space-around"} pt={2} pb={'env(safe-area-inset-bottom)'}
              zIndex={'docked'} maxW={'container.lg'}
      >
        <Button variant={"ghost"} onClick={()=> {
          navigate('/pets/create')
        }}>
          Create
        </Button>
      </HStack>
    </Stack>
  )
}

export default Orders