import { useMutation } from '@apollo/client'
import { timeFromImageMutation } from 'graphqldefs'

import { TimeFromImageModel } from '../../../times-api/src/ia/models/timefromimage.model'
import { graphql } from '../../lib'

export const useTimeFromImage = () => {
  const [getTimeFromImage, { loading: gettingTimeFromImage }] = useMutation<{
    timeFromImage: TimeFromImageModel
  }>(graphql(timeFromImageMutation))

  return {
    getTimeFromImage,
    gettingTimeFromImage,
  }
}
