import {Stack, Text} from "@chakra-ui/react";
import {useSearchParams} from "react-router-dom";

const Twitter = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state')
  const code = searchParams.get('code')

  return (
    <Stack>
      <Text>state: {state}</Text>
      <Text>code: {code}</Text>
    </Stack>
  )
}

export default Twitter