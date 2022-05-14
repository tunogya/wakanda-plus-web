import {Stack, Text} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";

const Orders = () => {
  return (
    <Stack>
      <CloseButton backRoute={'/'} />
      <Stack px={3} pt={2}>
        <Text>Orders</Text>
      </Stack>
    </Stack>
  )
}

export default Orders