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
      w={9} h={9} size={'sm'} alignItems={"center"} justifyContent={"center"} position={'fixed'}
      right={5} top={2} borderRadius={'full'} variant={'ghost'} bg={'#000'} color={'white'} opacity={0.6}
      onClick={() => {
        navigate(props.backRoute)
      }}
    >
      <SmallCloseIcon/>
    </Button>
  )
}

export default CloseButton