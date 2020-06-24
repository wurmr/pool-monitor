import { IResolvers, PubSub } from 'apollo-server'
import { getTemperature } from '../sensors/temperature'
import { getPressure } from '../sensors/pressure'
import { readInput } from '../seed/adc'

const pubsub = new PubSub()
const TEMP_CHANGED = 'TEMP_CHANGED'

setInterval(async () => {
  const reading = await readInput(4)
  const temperture = getTemperature(reading)
  pubsub.publish(TEMP_CHANGED, { temperatureChanged: temperture })
}, 5000)

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
  Subscription: {
    temperatureChanged: {
      subscribe: () => pubsub.asyncIterator([TEMP_CHANGED]),
    },
  },
}

export default resolvers
