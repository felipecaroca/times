export const createRacewayMutation = `
mutation CreateRaceway($input: CreateRacewayDTO!) {
  createRaceway(input: $input) {
    id
  }
}
`