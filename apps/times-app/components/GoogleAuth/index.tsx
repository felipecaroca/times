import { FC, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { Box, Button } from 'native-base'

import { saveToken } from '../../lib'

import { GoogleAuthComponentProps } from './types'

WebBrowser.maybeCompleteAuthSession()

const GoogleAuthComponent: FC<GoogleAuthComponentProps> = ({ onSuccess }) => {
  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response

      saveToken({
        accessToken: authentication?.idToken || '',
        refreshToken: authentication?.refreshToken || '',
      })
        .then(onSuccess)
        .catch(err => console.log('ERROR', err))
    }
  }, [response])

  return (
    <Box>
      <Button onPress={() => promptAsync()}>Iniciar sesión con Google</Button>
    </Box>
  )
}

export default GoogleAuthComponent
