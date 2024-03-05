import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { refreshTokenMutation } from '../../graphqldefs/mutations'
import { meQuery } from '../../graphqldefs/queries'
import { RefreshTokenModel } from '../../times-api/src/google/models/refreshtoken.model'
import { UserModel } from '../../times-api/src/users/models/user.model'
import { deleteToken, getToken, graphql, saveToken } from '../lib'

export const useSession = () => {
  const [userData, setUser] = useState<UserModel | undefined>()
  const [getUser, { loading }] = useLazyQuery(graphql(meQuery))
  const [refreshToken, { loading: refreshing }] = useMutation(
    graphql(refreshTokenMutation),
  )

  const getUserData = async (credentials?: RefreshTokenModel) => {
    if (credentials?.accessToken)
      try {
        const response = await getUser()

        return response.data?.me || response.error?.message
      } catch (r) {
        console.log(r)
      }
  }

  const handleUser = async () => {
    const credentials = await getToken()

    let user = await getUserData(credentials)

    if (user?.toString()?.includes('TOKEN_EXPIRED'))
      try {
        const res = await refreshToken({
          variables: {
            refreshToken: credentials?.refreshToken,
          },
        })

        await saveToken(res.data.refreshToken)

        user = await getUserData(res.data.refreshToken)
      } catch (e) {
        console.log('err', e)
      }

    setUser(user)
  }

  const logout = () => {
    deleteToken()
  }

  useEffect(() => {
    handleUser()
  }, [])

  return {
    userData,
    isLoading: loading || refreshing,
    logout,
    handleUser,
  }
}
