import React, { FC } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { useSession } from '../../hooks/useSession'
import { navigateTo } from '../../lib/navigation.lib'

const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const { userData, logout } = useSession()

  const closeSession = () => {
    logout()
    navigateTo('login')
    props.navigation.closeDrawer()
  }

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Image
          source={{
            uri: userData?.picture,
          }}
        />
        <Text>{userData?.name}</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity onPress={closeSession}>
        <View>
          <Ionicons name="log-out-outline" size={24} />
          <Text>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  )
}

export default DrawerContent
