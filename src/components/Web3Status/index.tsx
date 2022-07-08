import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure, TabPanel, TabPanels, Tab, Tabs, TabList,
} from "@chakra-ui/react"
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core"
import {isMobile} from "react-device-detect"
import {SUPPORTED_WALLETS} from "../../constants/wallet"
import {injected} from "../../connectors"
import {WalletConnectConnector} from "@web3-react/walletconnect-connector"
import {AbstractConnector} from "@web3-react/abstract-connector"
import React, {useEffect, useState} from "react"
import MetamaskIcon from "../../assets/svg/metamask.png"
import PendingView from "./PeddingView"
import usePrevious from "../../hooks/usePrevious"
import AccountDetails from "./AccountDetails"
import Identicon from "../Identicon"
import {shortenAddress} from "../../utils";
import "../../connectors/flow";
import * as fcl from "@onflow/fcl";
import BLOCTO_ICON from "../../assets/svg/Blocto.svg"
import LEDGER_ICON from "../../assets/svg/Ledger.svg"
import {useActiveFlowReact} from "../../hooks/flow";

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
}

const FLOW_WALLET_ICON: { [key: string]: any } = {
  "Blocto": BLOCTO_ICON,
  "Ledger": LEDGER_ICON
}

export const WalletModal = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {active, account, connector, activate, error} = useWeb3React()
  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const [pendingError, setPendingError] = useState<boolean>()
  const previousAccount = usePrevious(account)
  const { flowServices } = useActiveFlowReact()

  useEffect(() => {
    if (account && !previousAccount && isOpen) {
      onClose()
    }
  }, [account, previousAccount, isOpen, onClose])

  // always reset to account view
  useEffect(() => {
    if (isOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [isOpen])

  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (isOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, isOpen, activePrevious, connectorPrevious])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name === ""
      }
      return true
    })

    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
    activate(connector, undefined, true).catch(error => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connector)
      } else {
        setPendingError(true)
      }
    })
  }

  const getWeb3Status = () => {
    if (account) {
      return (
        <Stack direction={"row"} onClick={onOpen} cursor={"pointer"} alignItems={"center"} spacing={4}>
          <Text fontWeight={'semibold'}>{shortenAddress(account)}</Text>
          <Identicon/>
        </Stack>
      )
    }

    if (error) {
      return (
        <Stack onClick={onOpen} cursor={"pointer"}>
          <Text>Error</Text>
        </Stack>
      )
    }

    return (
      <Text onClick={onOpen} fontWeight={"semibold"} cursor={"pointer"}>
        Connect Wallet
      </Text>
    )
  }

  const getOptionsOnEth = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask

    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
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
            >
              <Stack direction={"row"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <Text>{option.name}</Text>
                <img src={option.iconURL} alt={"Icon"} width={36} height={36}/>
              </Stack>
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
              <Button id={`connect-${key}`} key={key} isFullWidth={true}>
                <Link href={"https://metamask.io/"} isExternal w={"full"}>
                  <Stack direction={"row"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text>Install Metamask</Text>
                    <img src={MetamaskIcon} alt={"Icon"} width={36} height={36}/>
                  </Stack>
                </Link>
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
            h={"60px"}
            variant={option.connector === connector ? "solid" : "outline"}
            borderRadius={12}
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
          >
            <Stack direction={"row"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
              <Text color={option.connector === connector ? option.color : "black"}>{option.name}</Text>
              <img src={option.iconURL} alt={"Icon"} width={36} height={36}/>
            </Stack>
          </Button>
        )
      )
    })
  }

  const getOptionsOnFlow = () => {
    return (
      flowServices.map((service: any) => (
        <Button
          isFullWidth={true}
          h={"60px"}
          variant={"outline"}
          borderRadius={12}
          id={`connect-${service.provider.name}`}
          onClick={() => fcl.authenticate({service})}
          key={service.id}
        >
          <Stack direction={"row"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
            <Text color={"black"}>{service.provider.name}</Text>
            <img src={FLOW_WALLET_ICON[service.provider.name]} alt={"Icon"} width={36} height={36}/>
          </Stack>
        </Button>
      ))
    )
  }

  const getModalContent = () => {
    if (error) {
      return (
        <>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>{error}</ModalBody>
          </ModalContent>
        </>
      )
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Account</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <AccountDetails openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}/>
            </ModalBody>
          </ModalContent>
        </>
      )
    }

    return (
      <>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader pb={2}>Connect Wallet</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {walletView === WALLET_VIEWS.PENDING ? (
              <PendingView
                connector={pendingWallet}
                error={pendingError}
                setPendingError={setPendingError}
                tryActivation={tryActivation}
              />
            ) : (
              <Stack pb={4} spacing={6}>
                <Text fontSize={'sm'} fontWeight={'semibold'} color={'gray'}>Choose how you want to connect. There are
                  several wallet providers.</Text>
                <Tabs variant='enclosed'>
                  <TabList>
                    <Tab fontWeight={"semibold"}>
                      Ethereum
                    </Tab>
                    <Tab fontWeight={"semibold"}>Flow</Tab>
                  </TabList>
                  <TabPanels pt={6}>
                    <TabPanel p={0}>
                      <Stack spacing={4}>
                        {getOptionsOnEth()}
                      </Stack>
                    </TabPanel>
                    <TabPanel p={0}>
                      <Stack spacing={4}>
                        {getOptionsOnFlow()}
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </>
    )
  }

  return (
    <>
      {getWeb3Status()}
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered>
        {getModalContent()}
      </Modal>
    </>
  )
}

export default WalletModal
