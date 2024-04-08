import { FC } from 'react'
import { Box, Button, Text } from 'native-base'

import { BetterTimeModel } from '../../../times-api/src/bettertimes/models/bettertime.model'
import { useTime } from '../../hooks'

import { TimeSaveConfirmProps } from './types'

const TimeSaveConfirm: FC<TimeSaveConfirmProps> = ({
  onCancel,
  onSave,
  milliseconds,
  minutes,
  seconds,
  isLoading,
}) => {
  const { modelTimeToString } = useTime()

  return (
    <Box>
      <Text fontSize={40} textAlign="center" w="full">
        {modelTimeToString({
          milliseconds,
          minutes,
          seconds,
        } as BetterTimeModel)}
      </Text>
      <Box
        flexDirection="row"
        alignContent="center"
        justifyContent="space-around">
        <Button
          w="40%"
          colorScheme="danger"
          isDisabled={isLoading}
          onPress={onCancel}>
          Cancelar
        </Button>
        <Button
          w="40%"
          colorScheme="success"
          isLoading={isLoading}
          onPress={onSave}>
          Guardar Tiempo
        </Button>
      </Box>
    </Box>
  )
}

export default TimeSaveConfirm
