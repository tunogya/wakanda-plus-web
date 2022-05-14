import {Button, Stack, Text} from "@chakra-ui/react";
import ControlBar from "../../components/ControlBar";
import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const menu = [
  {id: 0, label: 'Explore'},
  {id: 1, label: 'Go'},
]

const Explore = () => {
  let [params] = useSearchParams();
  const navigate = useNavigate()
  const currentId = Number(params.get('s') || 0)

  return (
    <Stack
      pt={12}
      px={5}
      minH={'90vh'}
      onWheel={e => {
        if (e.deltaX > 10) {
          if (currentId < 1) {
            navigate(`/explore?s=${currentId+1}`)
          }
        }
        if (e.deltaX < -10) {
          if (currentId > 0) {
            navigate(`/explore?s=${currentId-1}`)
          }
        }
      }}
    >
      <Text>type: {menu[currentId].label}</Text>
    </Stack>
  )
}

const WrappedExplore = () => {
  const navigate = useNavigate()
  let [params] = useSearchParams();

  return (
    <>
      <Stack position={'fixed'} top={0} w={'full'} px={5} pt={'env(safe-area-inset-top)'} bg={"white"}>
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} w={'full'} h={12}>
          {menu.map((item) => (
            <Button
              variant={"ghost"}
              px={0}
              color={Number( params.get('s')) === item.id ? 'black' : '#c5c5c5'}
              key={item.id}
              onClick={() => {
                navigate( item.id ? `/explore?s=${item.id}` : '/explore')
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Explore/>
      <ControlBar/>
    </>
  )
}

export default WrappedExplore