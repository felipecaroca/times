import { useQuery } from '@apollo/client'
import { racewaysQuery } from '@graphqldefs'
import { Box, Heading, Pressable, ScrollView } from 'native-base'

import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import { graphql } from '../../lib'

const RacewaysScreen = () => {
  const { data } = useQuery<{ raceways: RacewayModel[] }>(
    graphql(racewaysQuery),
  )

  return (
    <Box safeArea>
      <Box alignSelf="center" alignContent="center" w="full">
        <Heading alignSelf="center">Pistas</Heading>
      </Box>

      <ScrollView h="95%">
        {data?.raceways?.map(raceway => (
          <Pressable
            px="30px"
            py="8px"
            key={raceway.id}
            onPress={() => console.log('press', raceway.id)}>
            {({ isPressed }) => (
              <Box
                p="10px"
                h="100px"
                _text={{
                  color: '#fff',
                }}
                borderRadius="5px"
                bg={{
                  linearGradient: {
                    colors: [`lightBlue.800`, `violet.${isPressed ? 8 : 3}00`],
                    start: [0, 0],
                    end: [0, 1],
                  },
                }}>
                {raceway.name}
              </Box>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  )
}

export default RacewaysScreen
