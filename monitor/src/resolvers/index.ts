import { IResolvers, PubSub } from 'apollo-server'
import { getTemperature } from '../sensors/temperature'
import { getPressure } from '../sensors/pressure'
import { adcChannels, ChannelNumber } from '../seed/adc'
import { map } from 'rxjs/operators'

const pubsub = new PubSub()
const TEMP_CHANGED = 'TEMP_CHANGED'

adcChannels.pipe(map((c) => c?.[0])).subscribe((channel) => {
  if (!channel) return
  const reading = channel.value
  const temperture = getTemperature(reading)
  pubsub.publish(TEMP_CHANGED, { temperatureChanged: temperture })
})

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
        const currentValues = adcChannels.getValue()
        if (!currentValues) return
        const reading = currentValues[0].value
        return getTemperature(reading)
      },
      pressure: async () => {
        const currentValues = adcChannels.getValue()
        if (!currentValues) return
        const reading = currentValues[3].value
        return getPressure(reading)
      },
      adc: () => {
        const currentValues = adcChannels.getValue()
        if (!currentValues) return

        const allChannels: Array<ChannelNumber> = [0, 1, 2, 3]
        const channels = allChannels.map((n) => ({
          id: currentValues[n].id,
          value: currentValues[n].value,
        }))

        return { channels }
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
