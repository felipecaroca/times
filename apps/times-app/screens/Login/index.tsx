import GoogleAuthComponent from '../../components/GoogleAuth'
import { WithNavigation } from '../../generic/types/CustomFC'

const LoginScreen: WithNavigation = ({ navigation }) => {
  return (
    <GoogleAuthComponent
      onSuccess={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'raceways' }],
        })
      }
    />
  )
}

export default LoginScreen
