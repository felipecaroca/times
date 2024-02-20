import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

import RacewaysScreen from './screens/Raceways'

export default function App() {
  const config = { dependencies: { 'linear-gradient': LinearGradient } }

  return (
    <NativeBaseProvider config={config}>
      <RacewaysScreen />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  )
}
