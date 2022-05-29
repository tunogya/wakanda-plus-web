import {Button, Stack, useMediaQuery} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {GiStoneSphere} from "react-icons/gi";
import {BsBagPlusFill} from "react-icons/bs";

export const menuList = [
  {id: 'Explore', path: '/explore', icon1: <GiStoneSphere size={'24px'}/>, icon2: <GiStoneSphere size={'24px'}/>},
  {id: 'Home', path: '/', icon1: <BsBagPlusFill size={'24px'}/>, icon2: <BsBagPlusFill size={'24px'}/>},
]

const ControlBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)')

  return (
    <>
      {!isLargerThan1000 && (
        <Stack position={'fixed'} bottom={0} bg={'#F0F0F0'} py={2} w={"full"} zIndex={'docked'} maxW={'container.lg'}
               opacity={0.8}>
          <Stack direction={"row"} justifyContent={"space-around"} w={'full'} pb={'env(safe-area-inset-bottom)'}>
            {menuList.map((item) => (
              <Button
                key={item.id}
                variant={"ghost"}
                onClick={() => {
                  navigate(item.path)
                }}
                color={location.pathname === item.path ? "black" : "#c4c4c4"}
              >
                {location.pathname === item.path ? item.icon1 : item.icon2}
              </Button>
            ))}
          </Stack>
        </Stack>
      )}
    </>

  )
}

export default ControlBar