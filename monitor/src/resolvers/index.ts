import { IResolvers } from 'apollo-server'
import { promises as fs } from 'fs'
import { getTemperature } from '../sensors/temperature'
import { getPressure } from '../sensors/pressure'
import { readInput } from '../seed/adc'

const resolvers: IResolvers = {
  Query: {
    state: () => ({
      temperature: async () => {
        const reading = await readInput(4)
        return getTemperature(reading)
      },
      pressure: async () => {
        const reading = await readInput(7)
        return getPressure(reading)
      },
    }),
  },
}

export default resolvers
