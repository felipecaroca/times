import { useEffect } from 'react'
import { Linking } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box } from 'native-base'

import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import PressableButton from '../../components/PressableButton'
import { WithNavigation } from '../../generic/types/CustomFC'

const RacewayScreen: WithNavigation = ({ navigation }) => {
  const route = useRoute<RouteProp<{ raceway: RacewayModel }, 'raceway'>>()
  const { name, coords } = route.params

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [name])

  const openWaze = (coords: string) => {
    const wazeUrl = `https://www.waze.com/ul?ll=${coords}&navigate=yes&zoom=17`

    Linking.openURL(wazeUrl).catch(err =>
      console.error('Error al abrir Waze:', err),
    )
  }

  return (
    <Box>
      <PressableButton onClick={() => openWaze(coords)}>
        {`Ir a ${name}`}
      </PressableButton>
    </Box>
  )
}

export default RacewayScreen
