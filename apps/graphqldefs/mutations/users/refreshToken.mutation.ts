export const refreshTokenMutation = `
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
`