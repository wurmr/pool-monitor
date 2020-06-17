import { IResolvers } from 'apollo-server'

// schema. This resolver retrieves books from the "books" array above.
const resolvers: IResolvers = {
  Query: {
    state: () => ({
      temperature: 84.3,
      pressure: 9.8,
    }),
  },
}

export default resolvers
