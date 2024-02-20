export const userQuery = `
query User($userId: ID!) {
  user(id: $userId) {
    id
    createdAt
    updatedAt
    deletedAt
    email
    name
    sub
    betterTimes {
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
}
`