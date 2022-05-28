import {Button, Stack} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {AiFillHome, AiOutlineHome} from "react-icons/ai";
import {GiHolosphere, GiStoneSphere} from "react-icons/gi";

const ControlBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const list = [
    {id: 'Explore', path: '/explore', icon1: <GiStoneSphere size={'26px'}/>, icon2: <GiHolosphere size={'30px'}/>},
    {id: 'Home', path: '/', icon1: <AiFillHome size={'26px'}/>, icon2: <AiOutlineHome size={'26px'}/>},
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
            { location.pathname === item.path ? item.icon1 : item.icon2}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}

export default ControlBar