import { Box, ScrollView } from 'native-base'

import Loading from '../../components/Loading'
import PressableButton from '../../components/PressableButton'
import { WithNavigation } from '../../generic/types/CustomFC'
import { useRaceways } from '../../hooks'

const RacewaysScreen: WithNavigation = ({ navigation }) => {
  const { raceways, loadingRaceways } = useRaceways()

  return (
    <Loading isLoading={loadingRaceways}>
      <Box safeArea>
        <ScrollView>
          {raceways.map(raceway => (
            <PressableButton
              key={raceway.id}
              onClick={() => navigation?.navigate('raceway', raceway)}>
              {raceway.name}
            </PressableButton>
          ))}
        </ScrollView>
      </Box>
    </Loading>
  )
}

export default RacewaysScreen
