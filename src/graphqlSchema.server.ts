import { createSchema } from 'graphql-yoga'

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
}

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})
