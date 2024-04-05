import { createStackNavigator } from '@react-navigation/stack'

import BetterTimesScreen from '../screens/BetterTimes'
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
        headerTintColor: colors.white,
      }}>
      <Stack.Screen
        name="raceways"
        component={RacewaysScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="raceway" component={RacewayScreen} />
      <Stack.Screen
        name="betterTimes"
        component={BetterTimesScreen}
        options={{ title: 'Mejores tiempos' }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation
