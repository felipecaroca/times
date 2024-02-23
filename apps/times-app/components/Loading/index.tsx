import { StyleSheet } from 'react-native'
import { Box, Image, Skeleton, Text, VStack } from 'native-base'

import { WithChildren } from '../../generic/types/CustomFC'
import { colors } from '../../utils'

import { LoadingProps } from './types'

const Loading: WithChildren<LoadingProps> = ({ isLoading, children }) => {
  const imageStyle = StyleSheet.create({
    image: { width: 'auto', height: 200 },
  })

  return isLoading ? (
    <VStack bg={colors.white} h="full" alignItems="center">
      <Box w="200">
        <Skeleton
          h="200"
          mt="200"
          zIndex={2}
          startColor={colors.skeleton.start}
          endColor={colors.skeleton.end}
        />
        <Image
          mt="-200"
          source={require('../../assets/loading.png')}
          alt="logo de cargando..."
          style={imageStyle.image}
          zIndex={5}
        />
        <Text textAlign="center">Cargando...</Text>
      </Box>
    </VStack>
  ) : (
    children
  )
}

export default Loading
