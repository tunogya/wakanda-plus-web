import {HStack, Text} from "@chakra-ui/react";
import {WalletModal} from "../Web3Status";

const Header = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Text fontWeight={'bold'}>Wakanda+</Text>
      <WalletModal />
    </HStack>
  )
}

export default Header