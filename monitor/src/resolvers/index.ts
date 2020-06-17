import { IResolvers } from 'apollo-server'

const resolvers: IResolvers = {
  Query: {
    state: () => ({
      temperature: Math.random() * 100,
      pressure: Math.random() * 10,
    }),
  },
}

export default resolvers
