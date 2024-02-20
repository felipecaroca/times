export const betterTimesByUserQuery = `
query BetterTimesByUser($userId: ID!) {
  betterTimesByUser(userId: $userId) {
    id
    createdAt
    updatedAt
    deletedAt
    racewayId
    raceway {
      id
      name
      coords
    }
    userId
    minutes
    seconds
    milliseconds
  }
}
`