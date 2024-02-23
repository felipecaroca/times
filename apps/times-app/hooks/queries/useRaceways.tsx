import { useQuery } from '@apollo/client'

import { racewaysQuery } from '../../../graphqldefs/queries'
import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import { graphql } from '../../lib'

export const useRaceways = () => {
  const { data, loading, refetch } = useQuery<{ raceways: RacewayModel[] }>(
    graphql(racewaysQuery),
  )

  return {
    raceways: data?.raceways || [],
    loadingRaceways: loading,
    getRaceways: refetch,
  }
}
