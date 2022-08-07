import {Button, Divider, HStack, Link, Stack, Text} from "@chakra-ui/react"
import {ExplorerDataType, getExplorerLink} from "../utils/getExplorerLink";
import {SupportedChainId} from "../constants/chains";
import {WAKANDAPASS_ADDRESS} from "../constants/address";
import {useNavigate} from "react-router-dom";

const Root = () => {
  const navigate = useNavigate()

  return (
    <Stack spacing={'24px'} align={"center"}>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>Wakanda Pass</Text>
        <Divider/>
        <Text fontSize={'xs'}>
          Contract: <Link
          href={getExplorerLink(SupportedChainId.POLYGON, WAKANDAPASS_ADDRESS[SupportedChainId.POLYGON], ExplorerDataType.ADDRESS) + '#code'}
          isExternal textDecoration={"underline"} fontWeight={'500'}>Polygonscan</Link>,
          Opensea: <Link
          href={'https://opensea.io/collection/wakandapass'}
          isExternal textDecoration={"underline"} fontWeight={'500'}>Wakanda Pass</Link>
        </Text>
        <Button
          w={'300px'}
          minH={'40px'}
          bg={"rgb(122, 74, 221)"}
          color={"white"}
        >
          How to CLAIM
        </Button>
        <Divider/>
        <Text fontSize={'xs'}>
          Contract: <Link href={'https://testnet.flowscan.org/contract/A.f5c21ffd3438212b.WakandaPass'}
                               textDecoration={"underline"} fontWeight={'500'}>Flowscan</Link>
        </Text>
        <Button w={'300px'} minH={'40px'} bg={"rgb(105,239,148)"} color={'white'}>
          Flow Portal [testnet]
        </Button>
      </Stack>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>Sign Message</Text>
        <Divider/>
        <Button w={'300px'} minH={'40px'} bg={'black'} color={"white"} onClick={() => {
          navigate('sign/')
        }}>
          Enter
        </Button>
      </Stack>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xs'}>
          Github: <Link href={'https://github.com/wakandalabs'} isExternal textDecoration={'underline'}
                        fontWeight={'500'}>
          Wakanda Labs
        </Link>
          <br/>
          Discord: <Link href={'https://discord.gg/hzvXbjtzgj'} isExternal fontWeight={'500'} textDecoration={'underline'}>Wakanda Metaverse</Link>
        </Text>
      </Stack>
    </Stack>
  )
}

export default Root
