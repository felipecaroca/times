import { FC } from 'react'

import GoogleAuthComponent from '../../components/GoogleAuth'

import { LoginScreenProps } from './types'

const LoginScreen: FC<LoginScreenProps> = ({ onSuccess }) => {
  return <GoogleAuthComponent onSuccess={onSuccess} />
}

export default LoginScreen
