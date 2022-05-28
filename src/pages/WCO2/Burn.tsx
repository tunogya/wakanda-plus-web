import {Button, Input, Stack, Text} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";
import {useMintableERC20Contract} from "../../hooks/useContract";
import {WCO2_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {useState} from "react";
import {formatNumber, parseToBigNumber} from "../../utils/bigNumberUtil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";
import useWCO2 from "../../hooks/useWCO2";

const Burn = () => {
  const {chainId} = useActiveWeb3React()
  const WCO2 = useMintableERC20Contract(WCO2_ADDRESS[chainId ?? 1])
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState(IDLE)
  const {balance, burned} = useWCO2()

  const burn = async () => {
    if (WCO2 && parseToBigNumber(amount).gt(0)) {
      setStatus(PROCESSING)
      const q = await WCO2.burn(parseToBigNumber(amount).shiftedBy(18).toFixed())
      const res = await q.wait()
      switch (res.status) {
        case 0:
          setStatus(ERROR)
          setTimeout(()=>{
            setStatus(IDLE)
          }, IDLE_DELAY)
          break;
        case 1:
          setStatus(SUCCESS)
          setTimeout(()=>{
            setStatus(IDLE)
          }, IDLE_DELAY)
          break;
        default:
          setStatus(ERROR)
          setTimeout(()=>{
            setStatus(IDLE)
          }, IDLE_DELAY)
          break;
      }
    }
  }

  return (
    <Stack h={"full"}>
      <CloseButton backRoute={'/wco2'} />
      <Stack p={5} fontSize={'sm'} fontWeight={'semibold'} pt={12}>
        <Text>Total burned: {formatNumber(burned.shiftedBy(-18), 2)} WCO2</Text>
        <Input
          value={amount}
          type={'number'}
          onChange={(e)=> setAmount(e.target.value)}
          isInvalid={parseToBigNumber(amount).lt(0) || parseToBigNumber(amount).gt(balance.shiftedBy(-18))}
        />
        <Button
          isLoading={status === PROCESSING}
          variant={'outline'}
          disabled={parseToBigNumber(amount).lt(0) || parseToBigNumber(amount).gt(balance.shiftedBy(-18))}
          onClick={burn}
          loadingText={'Waiting for burn'}
        >
          { status === IDLE && "Burn WCO2" }
          { status === SUCCESS && "Success" }
          { status === ERROR && "Error" }
        </Button>
        <Stack pt={5}>
          <Text>Completed Burns:</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Burn