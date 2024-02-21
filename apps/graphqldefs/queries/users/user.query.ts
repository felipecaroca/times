export const userQuery = `
query User($id: ID!) {
  user(id: $id) {
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