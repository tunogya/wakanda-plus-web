import {FC} from "react";
import {Button} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

type CloseButtonProps = {
  backRoute: string
}

const CloseButton: FC<CloseButtonProps> = ({...props}) => {
  const navigate = useNavigate()

  return (
    <Button
      w={9} h={9} size={'sm'} bg={"white"} alignItems={"center"} justifyContent={"center"} position={'fixed'}
      right={5} top={5} borderRadius={'full'} variant={'ghost'}
      onClick={() => {
        navigate(props.backRoute)
      }}
    >
      <SmallCloseIcon/>
    </Button>
  )
}

export default CloseButton