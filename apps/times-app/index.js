import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { registerRootComponent } from 'expo'

import { navigateTo } from './lib/navigation.lib'
import App from './App'
import { getToken } from './lib'

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      console.log(message)

      if (message === 'UNAUTHORIZED') navigateTo('login')
    })
})

const authLink = setContext(async (_, { headers }) => {
  try {
    const credentials = await getToken()
    const token = credentials?.accessToken

    console.log('token', token)

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  } catch (error) {
    console.error('Error al obtener el token:', error)

    return {
      headers,
    }
  }
})

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL,
})

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),

  defaultOptions: { watchQuery: { fetchPolicy: 'network-only' } },
})

const AppMain = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

registerRootComponent(AppMain)
