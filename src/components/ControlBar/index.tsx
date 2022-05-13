import {Button, Stack, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";

const ControlBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const list = [
    { id: 'Explore', path: '/explore' },
    { id: 'Home', path: '/' },
  ]

  return (
    <Stack position={'fixed'}
           bottom={0} bg={'#c4c4c4'}
           maxW={'container.md'}
           w={'full'} direction={"row"}
           justifyContent={"space-around"}
           pt={1} pb={7}
    >
      { list.map((item)=> (
        <Button
          key={item.id}
          variant={"ghost"}
          onClick={() => {
            navigate(item.path)
          }}
          color={location.pathname === item.path ? "white" : "black"}
        >
          <Stack>
            <Text>{item.id}</Text>
          </Stack>
        </Button>
      )) }
    </Stack>
  )
}

export default ControlBar