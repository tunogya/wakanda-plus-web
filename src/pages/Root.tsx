import {Button, Divider, Input, Link, Stack, Text} from "@chakra-ui/react"

const Root = () => {
  return (
    <Stack spacing={'24px'} align={"center"}>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>Wakanda Pass</Text>
        <Divider/>
        <Text fontSize={'xs'}>
          View Contract: <Link textDecoration={"underline"} fontWeight={'500'}>polygonscan</Link>
        </Text>
        <Button w={'300px'} minH={'40px'} bg={"rgb(122, 74, 221)"} color={"white"}>
          Polygon Portal
        </Button>
        <Divider/>
        <Text fontSize={'xs'}>
          View Contract: <Link textDecoration={"underline"} fontWeight={'500'}>polygonscan</Link>
        </Text>
        <Button w={'300px'} minH={'40px'} bg={"rgb(105,239,148)"} color={'white'}>
          Flow Testnet Portal
        </Button>
      </Stack>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>Sign Message</Text>
        <Divider/>
        <Input w={'300px'} borderRadius={0} placeholder={'Enter Code'}/>
        <Button w={'300px'} minH={'40px'} bg={'black'} color={"white"}>
          Enter
        </Button>
      </Stack>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xs'}>
          Github: <Link href={'https://github.com/wakandalabs'} isExternal textDecoration={'underline'} fontWeight={'500'}>
          Wakanda Labs
        </Link>
          <br/>
          Discord: <Link isExternal fontWeight={'500'} textDecoration={'underline'}>Wakanda Metaverse</Link>
        </Text>
      </Stack>
    </Stack>
  )
}

export default Root
