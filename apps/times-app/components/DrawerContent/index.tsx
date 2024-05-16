import React, { FC, useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { Avatar, Box, Flex, Input } from 'native-base'

import { useSession } from '../../hooks/useSession'

import { DrawerContentProps } from './types'

const NICK_NAME = 'NICK_NAME'

const DrawerContent: FC<DrawerContentProps> = ({ onLogout, ...props }) => {
  const { userData, logout } = useSession()
  const [nickName, setNickName] = useState<string | undefined>(undefined)

  const saveNickName = async () => nickName && setItemAsync(NICK_NAME, nickName)

  const getNickName = async () => getItemAsync(NICK_NAME)

  const closeSession = () => {
    logout()
    props.navigation.closeDrawer()
    onLogout()
  }

  useEffect(() => {
    getNickName().then(nick => nick && setNickName(nick))
  }, [])

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

      <Box p={5}>
        <Input
          onChangeText={setNickName}
          value={nickName}
          placeholder="Alias"
          onSubmitEditing={saveNickName}
        />
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
