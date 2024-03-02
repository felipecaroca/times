import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigateTo = (name: string) =>
  navigationRef.isReady() && navigationRef.reset({
    index: 0,
    routes: [{ name }],

  })

