import { IResolvers } from 'apollo-server'

const resolvers: IResolvers = {
  Query: {
    state: () => ({
      temperature: Math.random() * 100, // read temp from i2c
      pressure: Math.random() * 10, // read pressure from i2c
    }),
  },
}

export default resolvers
