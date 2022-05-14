import {useNavigate} from "react-router-dom";
import {useActiveWeb3React} from "../../hooks/web3";
import {useEffect} from "react";

const CheckLogin = () => {
  const navigate = useNavigate()
  const {account} = useActiveWeb3React()

  useEffect(()=>{
    if (!account) {
      navigate('/login')
    }
  }, [account, navigate])

  return (
    <>
    </>
  )
}

export default CheckLogin