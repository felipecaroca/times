import { FC, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { Box, Button, Input, Text } from 'native-base'

import { TimeFormValues, TimePickerProps } from './types'

const TimePicker: FC<TimePickerProps> = ({ onSubmit, isLoading }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TimeFormValues>()

  const ref2 = useRef<TextInput>()
  const ref3 = useRef<TextInput>()

  const onSubmitForm = ({ minutes, seconds, milliseconds }: TimeFormValues) =>
    onSubmit({
      minutes: +minutes,
      seconds: +seconds,
      milliseconds: +milliseconds,
    })

  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-around">
        <Controller
          name="minutes"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isInvalid={!!errors.minutes}
              keyboardType="number-pad"
              w="25%"
              fontSize={20}
              placeholder="min..."
              onChangeText={onChange}
              onBlur={onBlur}
              value={value?.toString()}
              maxLength={2}
              onSubmitEditing={() => {
                ref2.current?.focus()
                ref2.current?.setSelection(0, 2)
              }}
            />
          )}
        />

        <Text fontSize={35}>:</Text>
        <Controller
          name="seconds"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="numeric"
              w="25%"
              isInvalid={!!errors?.seconds}
              fontSize={20}
              placeholder="seg.."
              maxLength={2}
              ref={ref2}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              selectionColor="white"
              onSubmitEditing={() => {
                ref3.current?.focus()
                ref3.current?.setSelection(0, 3)
              }}
            />
          )}
        />

        <Text fontSize={35}>.</Text>
        <Controller
          name="milliseconds"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isInvalid={!!errors?.milliseconds}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value?.toString()}
              keyboardType="number-pad"
              w="25%"
              fontSize={20}
              placeholder="mseg..."
              maxLength={3}
              ref={ref3}
              onSubmitEditing={handleSubmit(onSubmitForm)}
            />
          )}
        />
      </Box>
      <Box py="8" px="2">
        <Button isLoading={isLoading} onPress={handleSubmit(onSubmitForm)}>
          Ingresar
        </Button>
      </Box>
    </Box>
  )
}

export default TimePicker
