import { useQuery } from '@apollo/client'

import { racewayQuery } from '../../../graphqldefs/queries'
import { RacewayModel } from '../../../times-api/src/raceway/models/raceway.model'
import { graphql } from '../../lib'

export const useRaceway = (id: string) => {
  const { data, loading, refetch } = useQuery<{ raceway: RacewayModel }>(
    graphql(racewayQuery),
    {
      variables: {
        id,
      },
    },
  )

  return {
    raceway: data?.raceway,
    loadingRaceway: loading,
    getRaceway: refetch,
  }
}
