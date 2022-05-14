import {Button, Stack, Text} from "@chakra-ui/react";
import ControlBar from "../../components/ControlBar";
import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const Explore = () => {
  return (
    <Stack pt={16} px={5}>
      <Text>Explore</Text>
    </Stack>
  )
}

const WrappedExplore = () => {
  const navigate = useNavigate()
  let [params] = useSearchParams();

  return (
    <>
      <Stack position={'fixed'} top={0} w={'full'} px={5} pt={5} bg={"white"}>
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