import { FC, useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { Box, Button, Image } from 'native-base'

import { style } from './style'
import { CameraComponentProps } from './types'

const CameraComponent: FC<CameraComponentProps> = ({
  onQueryPicture,
  isLoading,
}) => {
  const [permission] = Camera.useCameraPermissions()
  const [hasPermission, setHasPermission] = useState(permission)
  const [preview, setPreview] = useState<CameraCapturedPicture | undefined>()
  const cameraRef = useRef<Camera | null>(null)

  const checkPermission = async () => {
    const res = await Camera.requestCameraPermissionsAsync()

    setHasPermission(res)
  }

  useEffect(() => {
    checkPermission()
  }, [])

  if (!hasPermission?.granted) return <Box>No hay permiso de camara</Box>

  const takePicture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({ base64: true })

    setPreview(picture)
  }

  return (
    <Box h="full">
      {preview ? (
        <Box h="600">
          <Image src={preview.uri} alt="preview" width="full" height="full" />
          <Box flexDirection="row" justifyContent="space-evenly">
            <Button
              top={-50}
              w="100"
              isDisabled={isLoading}
              onPress={() => setPreview(undefined)}>
              Tomar otra
            </Button>
            {!!preview.base64 && (
              <Button
                isLoading={isLoading}
                colorScheme="green"
                top={-50}
                w="100"
                onPress={() =>
                  onQueryPicture(preview.base64 || '', () =>
                    setPreview(undefined),
                  )
                }>
                Ver tiempo
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Camera
          ratio="16:9"
          type={CameraType.back}
          style={style.camera}
          ref={cameraRef}>
          <Box
            position="fixed"
            bottom={5}
            justifyContent="center"
            flexDirection="row">
            <TouchableOpacity onPress={takePicture} style={style.cameraButton}>
              <Ionicons name="camera" size={40} />
            </TouchableOpacity>
          </Box>
        </Camera>
      )}
    </Box>
  )
}

export default CameraComponent
