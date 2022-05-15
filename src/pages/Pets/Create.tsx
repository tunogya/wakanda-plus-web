import {Button, FormControl, FormLabel, Input, Stack} from "@chakra-ui/react";
import CloseButton from "../../components/CloseButton";
import {useState} from "react";
import useUserInfo, {strapi_key} from "../../hooks/useUserInfo";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/status";

const Create = () => {
  const [username, setUsername] = useState('')
  const {userInfo} = useUserInfo()
  const [status, setStatus] = useState(IDLE)

  const register = async () => {
    if (username) {
      setStatus(PROCESSING)
      await fetch(
        `https://wkd-strapi.herokuapp.com/api/wakanda-pets`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${strapi_key}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              username: username,
              masters: userInfo.id
            }
          })
        }
      ).then(()=> {
        setStatus(SUCCESS)
        setUsername('')
        setTimeout(()=>{
          setStatus(IDLE)
        }, IDLE_DELAY)
      })
        .catch(()=> {
          setStatus(ERROR)
          setTimeout(()=>{
            setStatus(IDLE)
          }, IDLE_DELAY)
        })
    }
  }

  return (
    <Stack>
      <CloseButton backRoute={'/pets'} />
      <Stack pt={10} px={3} spacing={5}>
        <FormControl>
          <FormLabel htmlFor='username'>name</FormLabel>
          <Input id='username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </FormControl>
        <Button
          disabled={username === ""}
          onClick={register}
          isLoading={status === PROCESSING}
        >
          { status === SUCCESS && 'Success' }
          { status === ERROR && 'ERROR' }
          { status === IDLE && 'Register' }
        </Button>
      </Stack>
    </Stack>
  )
}

export default Create