import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import { RefreshTokenModel } from '../../times-api/src/google/models/refreshtoken.model'

export const saveToken = async (params: RefreshTokenModel) => {
  await setItemAsync('user', JSON.stringify(params))
}

export const getToken = async (): Promise<RefreshTokenModel | undefined> => {
  const credentials = await getItemAsync('user') || undefined

  if (credentials) {
    const data = JSON.parse(credentials) as RefreshTokenModel

    return data
  }

  return undefined
}

export const deleteToken = async () => {
  await deleteItemAsync('user')
}
