export const createBetterTimeMutation = `
mutation CreateBetterTime($input: CreateBetterTimeDTO!) {
  createBetterTime(input: $input) {
    id
  }
}
`