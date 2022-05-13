import {Stack, Text} from "@chakra-ui/react";
import ControlBar from "../../components/ControlBar";

const Explore = () => {
  return (
    <Stack>
      <Text>Explore</Text>
    </Stack>
  )
}

const WrappedExplore = () => {
  return (
    <>
      <Explore />
      <ControlBar />
    </>
  )
}

export default WrappedExplore