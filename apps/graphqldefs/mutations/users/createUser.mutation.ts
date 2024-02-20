export const createUserMutation = `
mutation CreateUser($input: CreateUserDTO!) {
  createUser(input: $input) {
    id
  }
}
`