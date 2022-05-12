import {Stack, Text} from "@chakra-ui/react";
import Identicon from "../Identicon";
import React from "react";
import {useWeb3React} from "@web3-react/core";
import {useNavigate} from "react-router-dom";

const WalletAvatar = () => {
  const { account, error } = useWeb3React()
  const navigate = useNavigate()

  if (account) {
    return (
      <Stack cursor={'pointer'}
        onClick={()=>{
        navigate('account')
      }}>
        <Identicon />
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack cursor={"pointer"} h={'36px'} w={'36px'} bg={'black'}>
        <Text>Error</Text>
      </Stack>
    )
  }

  return (
    <Stack h={'36px'} alignItems={"center"} justifyContent={"center"} onClick={()=> {
      navigate('login')
    }}>
      <Text fontWeight={"semibold"} cursor={"pointer"}>
        Connect Wallet
      </Text>
    </Stack>

  )
}

export default WalletAvatar