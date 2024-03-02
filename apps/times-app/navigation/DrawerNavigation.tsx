import { createDrawerNavigator } from '@react-navigation/drawer'

import DrawerContent from '../components/DrawerContent'
import { colors } from '../utils'

import StackNavigation from './StackNavigation'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="main"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary.dark,
        },
        headerTintColor: '#fff',
      }}>
      <Drawer.Screen name="main" component={StackNavigation} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation
