import {Button, Divider, Stack, Text} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";
import totalSupply from "../../flow/scripts/totalSupply";
import balanceOf from "../../flow/scripts/balanceOf";
import isInit from "../../flow/scripts/isInit";
import initPass from "../../flow/tx/initPass";
import setup from "../../flow/tx/setup";
import {useActiveFlowReact} from "../../hooks/flow";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";

const FlowPortal = () => {
  const [myInit, setMyInit] = useState(false);
  const [supply, setSupply] = useState('-');
  const [balance, setBalance] = useState('-');
  const [initStatue, setInitStatue] = useState(IDLE);
  const [genesStatue, setGenesStatue] = useState(IDLE);
  const { user } = useActiveFlowReact();

  const fetchTotalSupply = useCallback(async () => {
    const res = await totalSupply()
    if (res) {
      setSupply(res)
    }
  }, [])

  const fetchBalance = useCallback(async () => {
    if (user.addr && myInit) {
      try {
        const res = await balanceOf(user.addr)
        if (res) {
          setBalance(res)
        }
      } catch (e) {
        console.log('fetch balance error')
      }
    }
  }, [user.addr, myInit])

  const fetchIsInit = useCallback(async () => {
    if (user.addr) {
      try {
        const res = await isInit(user.addr)
        if (res) {
          setMyInit(res)
        }
      } catch (e) {
        console.log('isInit error')
      }
    }
  }, [user.addr])

  const initMyAccount = async () => {
    if (user.addr) {
      try {
        setInitStatue(PROCESSING)
        const res = await setup(user.addr)
        if (res?.status === 4) {
          setInitStatue(SUCCESS)
          setTimeout(() => {
            setInitStatue(IDLE)
          }, IDLE_DELAY)
        } else {
          setInitStatue(ERROR)
          setTimeout(() => {
            setInitStatue(IDLE)
          }, IDLE_DELAY)
        }
      } catch (e) {
        console.log('init error')
        setInitStatue(ERROR)
        setTimeout(() => {
          setInitStatue(IDLE)
        }, IDLE_DELAY)
      }
    }
  }

  const genesWakandaPass = async () => {
    if (user.addr && myInit) {
      try {
        setGenesStatue(PROCESSING)
        const res = await initPass(user.addr)
        if (res?.status === 4) {
          setGenesStatue(SUCCESS)
          setTimeout(() => {
            setGenesStatue(IDLE)
          }, IDLE_DELAY)
        } else {
          setGenesStatue(ERROR)
          setTimeout(() => {
            setGenesStatue(IDLE)
          }, IDLE_DELAY)
        }
      } catch (e) {
        console.log(e)
        setGenesStatue(ERROR)
        setTimeout(() => {
          setGenesStatue(IDLE)
        }, IDLE_DELAY)
      }
    }
  }

  useEffect(() => {
    fetchTotalSupply()
    fetchBalance()
    fetchIsInit()
  }, [fetchTotalSupply, fetchBalance, fetchIsInit])

  return (
    <Stack spacing={'24px'} align={"center"}>
      <Stack maxW={'container.md'} w={'full'} border={'1px'} alignItems={"center"} spacing={'24px'} py={'24px'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>WakandaPass Portal on flow</Text>
        { user.addr && (
          <>
            <Divider/>
            { !myInit ? (
              <Button minW={'160px'} color={"black"} bg={"rgb(105,239,148)"} onClick={initMyAccount} isLoading={initStatue === PROCESSING}>
                { initStatue === IDLE && ("Initialize Account First") }
                { initStatue === ERROR && ("Initialize Error") }
                { initStatue === SUCCESS && ("Initialize Success") }
              </Button>
            ) : (
              <Text fontSize={'md'} fontWeight={'500'}>
                My Balance: {balance} WP
              </Text>
            ) }
          </>
        ) }
        <Divider/>
        <Text fontSize={'md'} fontWeight={'500'}>
          Total Supply: {supply} WP
        </Text>
        { user.addr && (
          <>
            <Divider/>
            { (supply === '0') && (
              <Button minW={'160px'} bg={"black"} color={'white'} isLoading={genesStatue === PROCESSING} onClick={genesWakandaPass}>
                { genesStatue === IDLE && ("Genes WakandaPass") }
                { genesStatue === ERROR && ("Error") }
                { genesStatue === SUCCESS && ("Success") }
              </Button>
            )}
          </>
        ) }
      </Stack>
    </Stack>
  )
}

export default FlowPortal