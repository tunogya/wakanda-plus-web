import {Button, Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";
import {useNavigate} from "react-router-dom";

const Pets = () => {
  const navigate = useNavigate()

  return (
    <Stack bg={'#F0F0F0'} h={'100vh'}>
      <CloseButton backRoute={'/'} />
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>Wakanda Pets</Text>
      </VStack>
      <Stack bg={"white"} h={'full'} p={3} borderTopRadius={24} spacing={3} pb={'90px'}>

      </Stack>
      <Stack position={'fixed'} bottom={0} bg={'#F0F0F0'} py={2} w={"full"} zIndex={'docked'} maxW={'container.lg'}>
        <Stack direction={"row"} justifyContent={"space-around"} w={'full'} pb={'env(safe-area-inset-bottom)'}>
        <Button variant={"ghost"} onClick={()=> {
          navigate('/pets/create')
        }}>
          Create
        </Button>
      </Stack>
      </Stack>
    </Stack>
  )
}

export default Pets