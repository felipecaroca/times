import { Box, Pressable } from 'native-base'

import { WithChildren } from '../../generic/types/CustomFC'
import { colors } from '../../utils'

import { PressableButtonProps } from './types'

const PressableButton: WithChildren<PressableButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <Pressable px="30px" py="8px" onPress={onClick}>
      {({ isPressed }) => (
        <Box
          p="10px"
          h="100px"
          _text={{
            color: colors.white,
          }}
          borderRadius="5px"
          bg={{
            linearGradient: {
              colors: [
                colors.street.dark,
                `${isPressed ? colors.street.dark : colors.street.light}`,
              ],
              start: [0, 0],
              end: [0, 1],
            },
          }}>
          {children}
        </Box>
      )}
    </Pressable>
  )
}

export default PressableButton
