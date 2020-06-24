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
      adc: () => {
        return {
          channels: [
            { id: 4, value: readInput(4) },
            { id: 5, value: readInput(5) },
            { id: 6, value: readInput(6) },
            { id: 7, value: readInput(7) },
          ],
        }
      },
    }),
  },
}

export default resolvers
