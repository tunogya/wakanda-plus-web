import {Button, Stack, Text, VStack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";
import {useNavigate} from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";

const Pets = () => {
  const navigate = useNavigate()
  const {userInfo} = useUserInfo()

  return (
    <Stack h={'100vh'}>
      <CloseButton backRoute={'/'}/>
      <VStack alignItems={"center"} pb={5} pt={24}>
        <Text fontWeight={'semibold'} fontSize={'2xl'}>Wakanda Pets</Text>
      </VStack>
      <Stack bg={"#F0F0F0"} h={'full'} p={5} borderTopRadius={24} spacing={3} pb={'90px'}>
        {userInfo.pets.map((item) => (
          <Stack direction={"row"} key={item.id} w={'full'} bg={'white'} p={5} borderRadius={12} alignItems={"center"}>
            <Text fontWeight={'semibold'}>{item.id}</Text>
            <Text fontWeight={'semibold'}>{item.username}</Text>
          </Stack>
        ))}
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

export default Pets