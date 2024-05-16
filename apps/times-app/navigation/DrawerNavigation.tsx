import { createDrawerNavigator } from '@react-navigation/drawer'

import DrawerContent from '../components/DrawerContent'
import Loading from '../components/Loading'
import { useSession } from '../hooks/useSession'
import LoginScreen from '../screens/Login'
import { colors } from '../utils'

import StackNavigation from './StackNavigation'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  const { userData, handleUser, isLoading } = useSession()

  const onSuccess = () => {
    handleUser()
  }

  const onLogout = () => {
    handleUser()
  }

  return (
    <Loading {...{ isLoading }}>
      {userData?.sub ? (
        <Drawer.Navigator
          initialRouteName="main"
          drawerContent={props => <DrawerContent {...{ onLogout, ...props }} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.secondary.dark,
            },
            headerTintColor: colors.white,
          }}>
          <Drawer.Screen
            name="main"
            component={StackNavigation}
            options={{ drawerLabel: 'Pistas', headerTitle: 'Pistas' }}
          />
        </Drawer.Navigator>
      ) : (
        <LoginScreen {...{ onSuccess }} />
      )}
    </Loading>
  )
}

export default DrawerNavigation
