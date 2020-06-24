import { ApolloServer } from 'apollo-server'
import typeDefs from './schema/typeDefs'
import resolvers from './resolvers'
import { startPolling } from './seed/adc'

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  startPolling(1000) // poll hardware every second
  console.log(`🚀  Server ready at ${url}`)
})
