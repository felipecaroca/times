/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { getItemAsync } from 'expo-secure-store'
import { Box, HStack, Switch, Text, useDisclose } from 'native-base'

import { TimeFromImageModel } from '../../../times-api/src/ia/models/timefromimage.model'
import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import CameraComponent from '../../components/Camera'
import Loading from '../../components/Loading'
import CustomModal from '../../components/modal'
import PressableButton from '../../components/PressableButton'
import TimePicker from '../../components/TimePicker'
import { TimeFormValues } from '../../components/TimePicker/types'
import TimeSaveConfirm from '../../components/TimeSaveConfirm'
import { WithNavigation } from '../../generic/types/CustomFC'
import {
  useCreateBetterTime,
  useRaceway,
  useTimeFromImage,
  useWaze,
} from '../../hooks'

const RacewayScreen: WithNavigation = ({ navigation }) => {
  const route = useRoute<RouteProp<{ raceway: RacewayModel }, 'raceway'>>()
  const [imageResponse, setImageResponse] = useState<
    TimeFromImageModel | undefined
  >(undefined)
  const [manual, setManual] = useState<boolean>(false)
  const [nickName, setNickName] = useState<string | undefined>(undefined)
  const { isOpen, onClose, onOpen } = useDisclose()
  const { openWaze } = useWaze()
  const { name, coords, id } = route.params

  const { raceway, loadingRaceway, getRaceway } = useRaceway(id)
  const { createBetterTime, isCreatingBetterTime } = useCreateBetterTime()
  const { getTimeFromImage, gettingTimeFromImage } = useTimeFromImage()

  // TODO: mejorar la obtención del alias

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [name])

  useEffect(() => {
    getItemAsync('NICK_NAME').then(nick => nick && setNickName(nick))
  }, [])

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

  const onQueryPicture = async (b64: string, cb?: () => void) => {
    const res = await getTimeFromImage({
      variables: {
        input: {
          b64,
          mediaType: 'image/jpeg',
          userAlias: nickName,
        },
      },
    })

    cb && cb()

    setImageResponse(res.data?.timeFromImage)
  }

  return (
    <Loading isLoading={loadingRaceway}>
      {raceway && (
        <Box>
          <PressableButton onClick={() => openWaze(coords)}>
            {`Ir a ${name}`}
          </PressableButton>
          <PressableButton onClick={goToBetterTimes}>
            Ver mejores tiempos
          </PressableButton>
          <PressableButton onClick={onOpen}>
            Agregar nuevo tiempo
          </PressableButton>
          <CustomModal
            {...{
              isOpen,
              onClose,
              title: (
                <Box
                  w="90%"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Text>Agrega tu nuevo tiempo.({nickName})</Text>
                  <HStack>
                    <Switch
                      onToggle={val => setManual(val)}
                      isChecked={manual}
                      value={manual}
                    />
                    <Text>Manual</Text>
                  </HStack>
                </Box>
              ),
            }}>
            {imageResponse ? (
              <TimeSaveConfirm
                {...{
                  onCancel: () => setImageResponse(undefined),
                  onSave: () =>
                    saveTime({
                      milliseconds: imageResponse.milliseconds,
                      seconds: imageResponse.seconds,
                      minutes: imageResponse.minutes,
                    }),
                  milliseconds: imageResponse.milliseconds,
                  seconds: imageResponse.seconds,
                  minutes: imageResponse.minutes,
                  isLoading: isCreatingBetterTime,
                }}
              />
            ) : manual ? (
              <TimePicker onSubmit={saveTime} />
            ) : (
              <CameraComponent
                {...{ onQueryPicture, isLoading: gettingTimeFromImage }}
              />
            )}
          </CustomModal>
        </Box>
      )}
    </Loading>
  )
}

export default RacewayScreen
