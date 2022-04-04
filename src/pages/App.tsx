import React from "react"
import { Route, Switch } from "react-router-dom"
import { Stack } from "@chakra-ui/react"
import Header from "../components/Header"
import Test from "./Test"
import Web3ReactManager from "../components/Web3ReactManager"

function App() {
  return (
    <Web3ReactManager>
      <Stack spacing={0} minH={"100vh"}>
        <Stack position={"fixed"} w={"100%"}>
          <Header />
        </Stack>
        <Stack p={"120px 16px 0 16px"} alignItems={"center"}>
          <Switch>
            <Route exact strict path="/" component={Test} />
            <Route />
          </Switch>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
