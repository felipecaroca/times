import { createStackNavigator } from '@react-navigation/stack'
import { Pressable, Text } from 'native-base'

import RacewayScreen from '../screens/Raceway'
import RacewaysScreen from '../screens/Raceways'

const Stack = createStackNavigator()

const NavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Pistas">
      <Stack.Screen
        name="Pistas"
        options={{
          headerRight: () => (
            <Pressable onPress={() => console.log('menu')}>
              <Text>lala</Text>
            </Pressable>
          ),
        }}
        component={RacewaysScreen}
      />
      <Stack.Screen name="raceway" component={RacewayScreen} />
    </Stack.Navigator>
  )
}

export default NavigationStack
