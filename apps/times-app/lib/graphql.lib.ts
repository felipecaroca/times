import { gql } from '@apollo/client'


export const graphql = (query: string) => {

  return gql`${query}`
}
