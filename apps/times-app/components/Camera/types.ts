export type CameraComponentProps = {
  onQueryPicture(picture: string, cb?: () => void): void
  isLoading?: boolean
}
