import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, FlatList, Text } from 'native-base'

import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import { WithNavigation } from '../../generic/types/CustomFC'
import { useTime } from '../../hooks'
import { colors } from '../../utils'

const BetterTimesScreen: WithNavigation = ({ navigation }) => {
  const route = useRoute<RouteProp<{ raceway: RacewayModel }, 'raceway'>>()
  const { modelTimeToString } = useTime()

  navigation.setOptions({
    title: 'Mejores tiempos',
  })

  return (
    <Box safeArea>
      <FlatList
        data={route.params.betterTimes}
        renderItem={({ item, index }) => (
          <Box
            borderBottomWidth={2}
            p={5}
            borderBottomColor={colors.flatList.border}
            bg={colors.white}>
            <Box justifyContent="space-between" flexDirection="row">
              <Text fontSize={30}>{index + 1} Pos. </Text>
              <Text fontSize={30}>{modelTimeToString(item)}</Text>
            </Box>
            <Box justifyContent="space-between" flexDirection="row">
              <Box>{item.user?.name}</Box>
            </Box>
          </Box>
        )}
      />
    </Box>
  )
}

export default BetterTimesScreen
