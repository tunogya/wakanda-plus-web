import {Button, Stack, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";

const ControlBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const list = [
    {id: 'Explore', path: '/explore'},
    {id: 'Home', path: '/'},
  ]

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-around"}
      py={2}
      position={'fixed'}
      zIndex={'docked'}
      bottom={0}
      bg={'#F0F0F0'}
      pb={'env(safe-area-inset-bottom)'}
      maxW={'container.lg'}
      w={'full'}
    >
      {list.map((item) => (
        <Button
          key={item.id}
          variant={"ghost"}
          onClick={() => {
            navigate(item.path)
          }}
          color={location.pathname === item.path ? "black" : "#c4c4c4"}
        >
          <Stack>
            <Text>{item.id}</Text>
          </Stack>
        </Button>
      ))}
    </Stack>
  )
}

export default ControlBar