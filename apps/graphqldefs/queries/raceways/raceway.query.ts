export const racewayQuery = `
query Raceway($id: ID!) {
  raceway(id: $id) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    coords
    betterTimes {
      id
      createdAt
      updatedAt
      deletedAt
      racewayId
      userId
      user {
        id
        name
        email
      }
      minutes
      seconds
      milliseconds
    }
  }
}`