import { Linking } from 'react-native'

export const useWaze = () => {
  const openWaze = (coords: string) => {
    const wazeUrl = `https://www.waze.com/ul?ll=${coords}&navigate=yes&zoom=17`

    Linking.openURL(wazeUrl).catch(err =>
      console.error('Error al abrir Waze:', err),
    )
  }

  return {
    openWaze,
  }
}
