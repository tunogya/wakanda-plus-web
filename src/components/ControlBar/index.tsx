import {Button, Stack} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";

const ControlBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const list = [
    {id: 'Explore', path: '/explore'},
    {id: 'Home', path: '/'},
  ]

  return (
    <Stack position={'fixed'} bottom={0} bg={'#F0F0F0'}  py={2} w={"full"} zIndex={'docked'} maxW={'container.lg'} opacity={0.8}>
      <Stack direction={"row"} justifyContent={"space-around"} w={'full'} pb={'env(safe-area-inset-bottom)'}>
        {list.map((item) => (
          <Button
            key={item.id}
            variant={"ghost"}
            onClick={() => {
              navigate(item.path)
            }}
            color={location.pathname === item.path ? "black" : "#c4c4c4"}
          >
            {item.id}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}

export default ControlBar