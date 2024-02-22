import { useQuery } from '@apollo/client'
import { racewaysQuery } from '@graphqldefs'
import { Box, ScrollView } from 'native-base'

import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import PressableButton from '../../components/PressableButton'
import { WithNavigation } from '../../generic/types/CustomFC'
import { graphql } from '../../lib'

const RacewaysScreen: WithNavigation = ({ navigation }) => {
  const { data } = useQuery<{ raceways: RacewayModel[] }>(
    graphql(racewaysQuery),
  )

  return (
    <Box safeArea>
      <ScrollView>
        {data?.raceways?.map(raceway => (
          <PressableButton
            key={raceway.id}
            onClick={() => navigation?.navigate('raceway', raceway)}>
            {raceway.name}
          </PressableButton>
        ))}
      </ScrollView>
    </Box>
  )
}

export default RacewaysScreen
