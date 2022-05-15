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
      position={'fixed'}
      zIndex={'docked'}
      bottom={'env(safe-area-inset-bottom)'}
      maxW={'container.lg'}
      w={'full'}
      px={3}
    >
      <Stack
        bg={'#F0F0F0'}
        direction={"row"}
        justifyContent={"space-around"}
        py={4}
        borderRadius={24}
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
    </Stack>
  )
}

export default ControlBar