import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { useActiveLocale } from "../../hooks/useActiveLocale"
import { LOCALE_LABEL, SUPPORTED_LOCALES } from "../../constants/locales"
import Web3Status from "../Web3Status"
import NetworkCard from "./NetworkCard";

export const Header = () => {
  const links = [
    { path: "/", label: "Test" },
  ]
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const { colorMode, toggleColorMode } = useColorMode()
  const { locale, switchLocale } = useActiveLocale()

  return (
    <Grid templateColumns="repeat(3, 1fr)" p={4} gap={6} alignItems={"center"}>
      <Stack justifySelf={"flex-start"} direction={"row"}>
        <Text fontWeight={"bold"} fontSize={"md"}>
          Create React Dapp
        </Text>
        <NetworkCard/>
      </Stack>
      <Stack justifySelf={"center"} direction={"row"} p={1} borderRadius={"md"}>
        {links.map((link, index) => (
          <Button
            key={index}
            size={"md"}
            variant={currentPath === link.path ? "solid" : "ghost"}
            onClick={() => {
              history.push(link.path)
              setCurrentPath(link.path)
            }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>
      <Stack justifySelf={"flex-end"} direction={"row"} alignItems={"center"}>
        <Web3Status />

        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />}/>
          <MenuList>
            <MenuItem>About</MenuItem>
            <MenuItem>Document</MenuItem>
            <MenuItem onClick={toggleColorMode}>{colorMode === "light" ? "Dark" : "Light"} Mode</MenuItem>
            <MenuDivider />
            <MenuOptionGroup defaultValue={locale} type="radio">
              {SUPPORTED_LOCALES.map((locale, index) => (
                <MenuItemOption value={locale} key={index} onClick={() => switchLocale(locale)}>
                  {LOCALE_LABEL[locale]}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Stack>
    </Grid>
  )
}

export default Header
