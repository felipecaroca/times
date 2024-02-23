import { useMutation } from '@apollo/client'
import { createBetterTimeMutation } from '@graphqldefs'

import { CreateBetterTimeDTO } from '../../../times-api/src/bettertimes/dto/createbettertime.dto'
import { graphql } from '../../lib'

export const useCreateBetterTime = () => {
  const [createBetterTime, { loading }] = useMutation<
    { id: string },
    { input: CreateBetterTimeDTO }
  >(graphql(createBetterTimeMutation))

  return {
    createBetterTime,
    isCreatingBetterTime: loading,
  }
}
