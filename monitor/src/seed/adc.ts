import { promises as fs } from 'fs'
import memoize from 'memoizee'
import { BehaviorSubject } from 'rxjs'

export type ChannelNumber = 0 | 3
type InputRange = 0 | 3

type Channels =
  | {
      [channel in ChannelNumber]: Channel
    }
  | undefined

interface Channel {
  id: InputRange
  value: number
}

const readInputRaw = async (input: InputRange) => {
  const filename = `/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/iio\:device0/in_voltage${input}_raw`
  const scaleFilename = `/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/iio\:device0/in_voltage${input}_scale`

  const scaleReading = await fs.readFile(scaleFilename, 'utf-8')
  const reading = await fs.readFile(filename, 'utf-8')

  const scaledValue = parseInt(reading) * parseFloat(scaleReading)
  return scaledValue
}

const readInput = memoize(readInputRaw, { maxAge: 1000, preFetch: true })

export const adcChannels = new BehaviorSubject<Channels>(undefined)

export const startPolling = (ms: number) => {
  const interval = setInterval(async () => {
    const rawValues = await Promise.all([readInput(0), readInput(3)])

    const channels = {
      0: {
        id: 0,
        value: rawValues[0],
      },
      3: {
        id: 3,
        value: rawValues[1],
      },
    } as const

    adcChannels.next(channels)
  }, ms)

  return () => clearInterval(interval)
}
