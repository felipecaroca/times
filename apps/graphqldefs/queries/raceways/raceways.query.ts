export const racewaysQuery = `
query Raceways {
  raceways {
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