import { useEffect } from 'react'
import { Linking } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, useDisclose } from 'native-base'

import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import Loading from '../../components/Loading'
import CustomModal from '../../components/modal'
import PressableButton from '../../components/PressableButton'
import TimePicker from '../../components/TimePicker'
import { TimeFormValues } from '../../components/TimePicker/types'
import { WithNavigation } from '../../generic/types/CustomFC'
import { useCreateBetterTime, useRaceway } from '../../hooks'

const RacewayScreen: WithNavigation = ({ navigation }) => {
  const route = useRoute<RouteProp<{ raceway: RacewayModel }, 'raceway'>>()
  const { isOpen, onClose, onOpen } = useDisclose()
  const { name, coords, id } = route.params

  const { raceway, loadingRaceway, getRaceway } = useRaceway(id)
  const { createBetterTime, isCreatingBetterTime } = useCreateBetterTime()

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

  const goToBetterTimes = () => navigation.navigate('betterTimes', raceway)
  const saveTime = (values: TimeFormValues) => {
    const { minutes, seconds, milliseconds } = values

    createBetterTime({
      variables: {
        input: { minutes, seconds, milliseconds, racewayId: id },
      },
    }).then(() => {
      onClose()
      getRaceway()
    })
  }

  return (
    <Loading isLoading={loadingRaceway}>
      <Box>
        <PressableButton onClick={() => openWaze(coords)}>
          {`Ir a ${name}`}
        </PressableButton>
        <PressableButton onClick={goToBetterTimes}>
          Ver mejores tiempos
        </PressableButton>
        <PressableButton onClick={onOpen}>Agregar nuevo tiempo</PressableButton>
        <CustomModal {...{ isOpen, onClose, title: 'Agrega tu nuevo tiempo.' }}>
          <TimePicker onSubmit={saveTime} isLoading={isCreatingBetterTime} />
        </CustomModal>
      </Box>
    </Loading>
  )
}

export default RacewayScreen
