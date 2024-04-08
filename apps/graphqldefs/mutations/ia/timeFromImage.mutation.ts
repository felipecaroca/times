export const timeFromImageMutation = `
  mutation TimeFromImage($input: TimeFromImageDTO!) {
    timeFromImage(input: $input) {
      userAlias
      seconds
      minutes
      milliseconds
    }
  }
`