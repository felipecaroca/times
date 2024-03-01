import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

import NavigationStack from './navigation/NavigationStack'

// comando para SHA  expo credentials:manager -p android

export default function App() {
  const config = { dependencies: { 'linear-gradient': LinearGradient } }

  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <NavigationStack />
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
