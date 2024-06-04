import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { NativeBaseProvider, StatusBar } from 'native-base'

import { navigationRef } from './lib/navigation.lib'
import DrawerNavigation from './navigation/DrawerNavigation'

// comando para SHA  expo credentials:manager -p android

export default function App() {
  const config = { dependencies: { 'linear-gradient': LinearGradient } }

  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigation />
        <StatusBar />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
