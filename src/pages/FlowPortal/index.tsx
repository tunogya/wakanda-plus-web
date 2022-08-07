import {Button, Divider, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";

const FlowPortal = () => {
  const [isInit, setIsInit] = useState(false);

  return (
    <Stack spacing={'24px'} align={"center"}>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>WakandaPass Portal on flow</Text>
        <Divider/>
        { !isInit ? (
          <Button color={"black"} bg={"rgb(105,239,148)"}>
            Initialize Account First
          </Button>
        ) : (
          <Text fontSize={'md'} fontWeight={'500'}>
            My balance:
          </Text>
        ) }
        <Divider/>
        <Text fontSize={'md'} fontWeight={'500'}>
          Total supply:
        </Text>
      </Stack>
    </Stack>
  )
}

export default FlowPortal