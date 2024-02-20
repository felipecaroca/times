import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { registerRootComponent } from 'expo'

import App from './App'

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_API_URL,
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
