import { StyleSheet } from 'react-native'

import { colors } from '../../utils'

export const style = StyleSheet.create({
  camera: {
    flex: 1,
    height: 600,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cameraButton: {
    alignItems: 'center',
    backgroundColor: colors.street.light,
    width: 60,
    height: 60,
    borderRadius: 100,
    padding: 10,
  },
})
