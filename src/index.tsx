import React, {StrictMode} from "react"
import ReactDOM from "react-dom"
import {createWeb3ReactRoot, Web3ReactProvider} from "@web3-react/core"
import {NetworkContextName} from "./constants/misc"
import reportWebVitals from "./reportWebVitals"
import {ChakraProvider, Stack} from "@chakra-ui/react"
import theme from "./theme"
import getLibrary from "./utils/getLibrary"
import "focus-visible/dist/focus-visible"
import Web3ReactManager from "./components/Web3ReactManager";
import Header from "./components/Header";
import App from "./pages/App";
import {HashRouter, Route, Routes} from "react-router-dom";
import {RecoilRoot} from "recoil";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const Content = () => {
  return (
    <Stack w={"100vw"} h={'100vh'}>
      <Stack py={4} px={[2, 8, 16, 32]} w={'full'} spacing={8}>
        <Header/>
        <App/>
      </Stack>
    </Stack>
  )
}

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Web3ReactManager>
                <Routes>
                  <Route path={'/'} element={<Content/>}/>
                  <Route path={'/:state'} element={<Content/>}/>
                </Routes>
              </Web3ReactManager>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </ChakraProvider>
      </RecoilRoot>
    </HashRouter>
  </StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
