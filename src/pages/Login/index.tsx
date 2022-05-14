import {Stack, chakra, Button} from "@chakra-ui/react";
import logoUrl from "../../assets/svg/wakandaplus.svg"
import {SUPPORTED_WALLETS} from "../../constants/wallet";
import {isMobile} from "react-device-detect";
import {injected} from "../../connectors";
import MetamaskIcon from "../../assets/images/metamask.png";
import React, {useEffect} from "react";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {AbstractConnector} from "@web3-react/abstract-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const {account, connector, activate} = useWeb3React()
  const navigate = useNavigate()

  useEffect(() => {
    if (account) {
      navigate('/')
    }
  }, [account, navigate])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name === ""
      }
      return true
    })

    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
    activate(connector, undefined, true).catch(error => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connector)
      }
    })
  }

  const getOptions = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask

    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Button
              id={`connect-${key}`}
              key={key}
              isFullWidth={true}
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              leftIcon={<chakra.img src={option.iconURL} alt={option.name} h={6} w={6}/>}
            >
              {option.name}
            </Button>
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <Button
                id={`connect-${key}`}
                key={key}
                isFullWidth={true}
                leftIcon={<chakra.img src={MetamaskIcon} alt={'Metamask'} h={6} w={6}/>}
                onClick={() => {
                  window.open('https://metamask.io/')
                }}
              >
                Install Metamask
              </Button>
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Button
            isFullWidth={true}
            variant={option.connector === connector ? 'solid' : 'outline'}
            borderRadius={12}
            id={`connect-${key}`}
            onClick={() => {
              !option.href && tryActivation(option.connector)
            }}
            key={key}
            leftIcon={<chakra.img src={option.iconURL} h={6} w={6} alt={option.name}/>}
            size={'lg'}
          >
            {option.name}
          </Button>
        )
      )
    })
  }

  return (
    <Stack alignItems={"center"} justifyContent={"center"} spacing={10}>
      <chakra.img src={logoUrl} alt={'Wakanda'} h={9} mt={40}/>
      <Stack spacing={6} w={'full'} px={5}>
        {getOptions()}
      </Stack>
    </Stack>
  )
}

export default Login