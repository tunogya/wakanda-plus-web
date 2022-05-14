import {Stack, Text} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";

const Create = () => {
  return (
    <Stack>
      <CloseButton backRoute={'/pets'} />
      <Stack pt={2} px={3}>
        <Text>Create</Text>
      </Stack>
    </Stack>
  )
}

export default Create