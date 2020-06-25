import { IResolvers, PubSub } from 'apollo-server'
import { getTemperature } from '../sensors/temperature'
import { getPressure } from '../sensors/pressure'
import { adcChannels, ChannelNumber } from '../seed/adc'
import { map } from 'rxjs/operators'

const pubsub = new PubSub()
const TEMP_CHANGED = 'TEMP_CHANGED'
const PRESSURE_CHANGED = 'PRESSURE_CHANGED'

adcChannels.pipe(map((c) => c?.[0])).subscribe((channel) => {
  if (!channel) return
  const reading = channel.value
  const temperture = getTemperature(reading)
  pubsub.publish(TEMP_CHANGED, { temperatureChanged: temperture })
})

adcChannels.pipe(map((c) => c?.[3])).subscribe((channel) => {
  if (!channel) return
  const reading = channel.value
  const pressure = getPressure(reading)
  pubsub.publish(PRESSURE_CHANGED, { pressureChanged: pressure })
})

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
      adc: () => ({}),
    }),
  },
  ADC: {
    channels: () => {
      const currentValues = adcChannels.getValue()
      if (!currentValues) return

      const allChannels: Array<ChannelNumber> = [0, 1, 2, 3]
      const channels = allChannels.map((n) => ({
        id: currentValues[n].id,
        value: currentValues[n].value,
      }))

      return channels
    },
    channel: (parent, { id }: { id: ChannelNumber }) => {
      const currentValues = adcChannels.getValue()
      if (!currentValues) return

      return {
        id: currentValues[id].id,
        value: currentValues[id].value,
      }
    },
  },
  // Channel: ({ id }: { id: ChannelNumber }) => {
  //   const currentValues = adcChannels.getValue()
  //   if (!currentValues) return

  //   return {
  //     id: currentValues[id].id,
  //     value: currentValues[id].value,
  //   }
  // },
  Subscription: {
    temperatureChanged: {
      subscribe: () => pubsub.asyncIterator([TEMP_CHANGED]),
    },
    pressureChanged: {
      subscribe: () => pubsub.asyncIterator([PRESSURE_CHANGED]),
    },
  },
}

export default resolvers
