import { createStackNavigator } from '@react-navigation/stack'

// import { Pressable, Text } from 'native-base'
import BetterTimesScreen from '../screens/BetterTimes'
import LoginScreen from '../screens/Login'
import RacewayScreen from '../screens/Raceway'
import RacewaysScreen from '../screens/Raceways'

const Stack = createStackNavigator()

const NavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="raceways"
        // options={{
        //  headerRight: () => (
        //   <Pressable onPress={() => console.log('menu')}>
        //    <Text>lala</Text>
        // </Pressable>
        // ),
        // }}
        component={RacewaysScreen}
      />
      <Stack.Screen name="raceway" component={RacewayScreen} />
      <Stack.Screen name="betterTimes" component={BetterTimesScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default NavigationStack
