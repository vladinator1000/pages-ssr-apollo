import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

loadDevMessages()
loadErrorMessages()

let cache = new InMemoryCache()

if (typeof window !== 'undefined') {
  let apolloState = (window as any).__APOLLO_STATE__
  cache.restore(apolloState)
}

export let graphqlClient = new ApolloClient({
  uri: '/graphql',
  cache,
})
