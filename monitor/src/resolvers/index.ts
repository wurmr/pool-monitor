import { IResolvers } from 'apollo-server'
import { promises as fs } from 'fs'
import { getTemperatures } from '../sensors/temperature'

const resolvers: IResolvers = {
  Query: {
    state: () => ({
      temperature: async () => {
        const reading = await fs.readFile(
          '/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/in4_input',
          'utf-8'
        )
        return getTemperatures(parseInt(reading))
      },
      pressure: async () =>
        await fs.readFile(
          '/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/in3_input',
          'utf-8'
        ),
    }),
  },
}

export default resolvers
