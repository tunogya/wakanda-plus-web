import {Stack, Center} from "@chakra-ui/react"
import {useParams} from "react-router-dom";
import Signature from "./Signature";

const App = () => {
  const {state} = useParams()

  return (
    <Stack>
      {state && (
        <Center>
          <Signature state={state}/>
        </Center>
      )}
    </Stack>
  )
}

export default App
