import React, { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Avatar, Box, Flex } from 'native-base'

import { useSession } from '../../hooks/useSession'

import { DrawerContentProps } from './types'

const DrawerContent: FC<DrawerContentProps> = ({ onLogout, ...props }) => {
  const { userData, logout } = useSession()

  const closeSession = () => {
    logout()
    props.navigation.closeDrawer()
    onLogout()
  }

  return (
    <DrawerContentScrollView {...props}>
      <Flex direction="row" align="center" pl={3}>
        <Box>
          <Avatar
            source={{
              uri: userData?.picture,
            }}
            size={70}
          />
        </Box>
        <Box ml={2}>
          <Text>{userData?.name}</Text>
        </Box>
      </Flex>
      <Box pl="3" py={1}>
        <Text>{userData?.email}</Text>
      </Box>

      <DrawerItemList {...props} />

      <Box px="3" py="5">
        <TouchableOpacity onPress={closeSession}>
          <Flex direction="row">
            <Ionicons name="log-out-outline" size={24} />
            <Text>Cerrar Sesión</Text>
          </Flex>
        </TouchableOpacity>
      </Box>
    </DrawerContentScrollView>
  )
}

export default DrawerContent
