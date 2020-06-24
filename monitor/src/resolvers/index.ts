import { IResolvers } from 'apollo-server'
import { promises as fs } from 'fs'
import { getTemperature } from '../sensors/temperature'
import { getPressure } from '../sensors/pressure'

const resolvers: IResolvers = {
  Query: {
    state: () => ({
      temperature: async () => {
        const reading = await fs.readFile(
          '/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/in4_input',
          'utf-8'
        )
        return getTemperature(parseInt(reading))
      },
      pressure: async () => {
        const reading = await fs.readFile(
          '/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/in7_input',
          'utf-8'
        )

        return getPressure(parseInt(reading))
      },
    }),
  },
}

export default resolvers
