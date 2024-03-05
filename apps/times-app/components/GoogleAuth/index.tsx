import { FC, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { Button, Flex, Image, Text } from 'native-base'

import { saveToken } from '../../lib'
import { colors } from '../../utils'

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
    <Flex h="full" justifyContent="center" p="5" bg={colors.white}>
      <Flex direction="row" alignItems="center" justifyContent="center">
        <Image
          source={require('../../assets/google-logo.png')}
          alt="google-logo"
          size={50}
        />
        <Text fontSize={30}>Bienvenido</Text>
      </Flex>
      <Button variant="ghost" onPress={() => promptAsync()}>
        Iniciar sesión con Google
      </Button>
    </Flex>
  )
}

export default GoogleAuthComponent
