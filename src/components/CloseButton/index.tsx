import {FC} from "react";
import {Button, Stack} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

type CloseButtonProps = {
  backRoute: string
}

const CloseButton: FC<CloseButtonProps> = ({...props}) => {
  const navigate = useNavigate()

  return (
    <Stack h={9} position={'fixed'} zIndex={'overlay'} top={2} alignItems={"end"} px={3} w={"full"} maxW={'container.lg'}>
      <Button
        w={9} h={9} alignItems={"center"} justifyContent={"center"} size={'sm'}
        borderRadius={'full'} variant={'ghost'} bg={'#000'} color={'white'} opacity={0.6}
        onClick={() => {
          navigate(props.backRoute)
        }}
      >
        <SmallCloseIcon/>
      </Button>
    </Stack>

  )
}

export default CloseButton