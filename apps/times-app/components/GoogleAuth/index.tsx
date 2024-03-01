import { useEffect, useState } from 'react'
import { TokenResponse } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { Box, Button } from 'native-base'

WebBrowser.maybeCompleteAuthSession()

const GoogleAuthComponent = () => {
  const [, setStoredToken] = useState<TokenResponse | null>()

  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response

      console.log(authentication)
      setStoredToken(authentication)
    }
  }, [response])

  return (
    <Box>
      <Button onPress={() => promptAsync()}>Iniciar sesión con Google</Button>
    </Box>
  )
}

export default GoogleAuthComponent
