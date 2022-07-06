import {Text, Stack} from "@chakra-ui/react"
import {useParams} from "react-router-dom";

const App = () => {

  const params = useParams()
  const state = params.state

  return (
    <Stack>
      <Text></Text>
    </Stack>
  )
}

export default App
