export const deleteUserMutation = `
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
`