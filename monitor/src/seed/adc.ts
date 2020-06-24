import { promises as fs } from 'fs'
import memoize from 'memoizee'
import { BehaviorSubject } from 'rxjs'

export type ChannelNumber = 0 | 1 | 2 | 3
type InputRange = 4 | 5 | 6 | 7

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
  const reading = await fs.readFile(
    `/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/in${input}_input`,
    'utf-8'
  )

  return parseInt(reading)
}

const readInput = memoize(readInputRaw, { maxAge: 5000, preFetch: true })

export const adcChannels = new BehaviorSubject<Channels>(undefined)

export const startPolling = (ms: number) => {
  const interval = setInterval(async () => {
    const rawValues = await Promise.all([
      readInput(4),
      readInput(5),
      readInput(6),
      readInput(7),
    ])

    const channels = {
      0: {
        id: 4,
        value: rawValues[0],
      },
      1: {
        id: 5,
        value: rawValues[1],
      },
      2: {
        id: 6,
        value: rawValues[2],
      },
      3: {
        id: 6,
        value: rawValues[3],
      },
    } as const

    adcChannels.next(channels)
  }, ms)

  return () => clearInterval(interval)
}

startPolling(1000)
