import {Button, Divider, Input, Link, Stack, Text} from "@chakra-ui/react"
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
          View Contract: <Link
          href={getExplorerLink(SupportedChainId.POLYGON, WAKANDAPASS_ADDRESS[SupportedChainId.POLYGON], ExplorerDataType.TOKEN)}
          isExternal textDecoration={"underline"} fontWeight={'500'}>polygonscan</Link>
        </Text>
        <Button w={'300px'} minH={'40px'} bg={"rgb(122, 74, 221)"} color={"white"}>
          Polygon Portal
        </Button>
        <Divider/>
        <Text fontSize={'xs'}>
          View Contract: <Link textDecoration={"underline"} fontWeight={'500'}>Flowscan</Link>
        </Text>
        <Button w={'300px'} minH={'40px'} bg={"rgb(105,239,148)"} color={'white'}>
          Flow Testnet Portal
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
