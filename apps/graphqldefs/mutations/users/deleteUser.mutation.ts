export const deleteUserMutation = `
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
`