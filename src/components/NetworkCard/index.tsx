import {Button, Menu, MenuButton, MenuItem, MenuList, useMediaQuery} from '@chakra-ui/react'
import {useActiveWeb3React} from '../../hooks/web3'
import {CHAIN_INFO, SupportedChainId} from '../../constants/chains'
import {BigNumber, utils} from 'ethers'
import * as React from 'react'

export const NetworkCard = () => {
  const {chainId, library} = useActiveWeb3React()
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const menus = [
    CHAIN_INFO[SupportedChainId.POLYGON],
    CHAIN_INFO[SupportedChainId.MUMBAI],
  ]

  const select = (chainId: number) => {
    return async () => {
      const {ethereum} = window
      if (!ethereum || !ethereum.on) {
        return
      }
      const formattedChainId = utils.hexStripZeros(BigNumber.from(chainId).toHexString())
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: formattedChainId}],
        })
        window.location.reload()
      } catch (switchError) {
        // @ts-ignore
        if (switchError.code === 4902) {
          switch (chainId) {
            case SupportedChainId.POLYGON:
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: utils.hexStripZeros(BigNumber.from(SupportedChainId.POLYGON).toHexString()),
                      chainName: 'Polygon',
                      nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                      },
                      rpcUrls: ['https://rpc-mainnet.matic.network'],
                      blockExplorerUrls: ['https://polygonscan.com/']
                    },
                  ],
                });
              } catch (addError) {
                // handle "add" error
              }
              break;
            case SupportedChainId.MUMBAI:
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: utils.hexStripZeros(BigNumber.from(SupportedChainId.MUMBAI).toHexString()),
                      chainName: 'Mumbai',
                      nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                      },
                      rpcUrls: ['https://rpc-mumbai.matic.today', 'https://matic-mumbai.chainstacklabs.com'],
                      blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                    },
                  ],
                });
              } catch (addError) {
                // handle "add" error
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        bg={"white"}
        color={'primary.500'}
        _hover={{color: 'primary.500', bg: 'white'}}
        _active={{color: 'primary.500', bg: 'white'}}
        fontSize={isLargerThan1024 ? 'md' : 'xs'}
        fontWeight={'medium'}
        px={'20px'}
        leftIcon={<img src={info.logoUrl} alt={'logo'} width={'16px'} height={'16px'}/>}
      >
        {info.label}
      </MenuButton>
      <MenuList borderRadius={'12px'} borderColor={'secondary.300'}>
        {menus.map((item) => (
          <MenuItem
            key={item.label}
            px={'20px'}
            onClick={select(item.chainId)}
            fontWeight={'medium'}
            icon={<img src={item.logoUrl} alt={'logo'} width={'16px'} height={'16px'}/>}
            isDisabled={item.chainId === chainId}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default NetworkCard
