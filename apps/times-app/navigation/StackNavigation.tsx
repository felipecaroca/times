import { createStackNavigator } from '@react-navigation/stack'

import BetterTimesScreen from '../screens/BetterTimes'
import LoginScreen from '../screens/Login'
import RacewayScreen from '../screens/Raceway'
import RacewaysScreen from '../screens/Raceways'
import { colors } from '../utils'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="raceways"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary.light,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="raceways" component={RacewaysScreen} />
      <Stack.Screen name="raceway" component={RacewayScreen} />
      <Stack.Screen name="betterTimes" component={BetterTimesScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigation
