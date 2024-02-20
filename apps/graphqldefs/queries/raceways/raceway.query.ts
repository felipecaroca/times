export const racewayQuery = `
query Raceway($racewayId: ID!) {
  raceway(id: $racewayId) {
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