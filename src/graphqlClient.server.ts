import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'

import { schema } from './graphqlSchema.server'
import { type WorkerContext } from './router.server'

loadDevMessages()
loadErrorMessages()

export function createGraphqlClientServer(context: WorkerContext) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: ApolloLink.from([new SchemaLink({ schema, context })]),
  })
}
