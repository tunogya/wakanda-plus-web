import {Button, Stack, Text} from "@chakra-ui/react";
import ControlBar from "../../components/ControlBar";
import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const Explore = () => {
  let [params] = useSearchParams();
  const type = params.get('s')

  return (
    <Stack pt={10} px={5}>
      <Text>type: {type || 'Explore'}</Text>
    </Stack>
  )
}

const WrappedExplore = () => {
  const navigate = useNavigate()
  let [params] = useSearchParams();

  return (
    <>
      <Stack position={'fixed'} top={0} w={'full'} px={5} pt={'env(safe-area-inset-top)'} bg={"white"}>
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} w={'full'} h={9}>
          {[
            {id: 'Explore', search: null},
            {id: 'Go', search: 'go'},
          ].map((item) => (
            <Button
              variant={"ghost"}
              px={0}
              color={params.get('s') === item.search ? 'black' : '#c5c5c5'}
              key={item.id}
              onClick={() => {
                navigate( item.search ? `/explore?s=${item.search}` : '/explore')
              }}
            >
              {item.id}
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