import { promises as fs } from 'fs'
import memoize from 'memoizee'

type inputRange = 4 | 5 | 6 | 7

const readInputRaw = async (input: inputRange) => {
  const reading = await fs.readFile(
    `/sys/devices/platform/soc/fe804000.i2c/i2c-1/1-0048/in${input}_input`,
    'utf-8'
  )

  return parseInt(reading)
}

export const startPolling = () => {
  const interval = setInterval(() => {
    Promise.all([readInput(4), readInput(5), readInput(6), readInput(7)])
  }, 1000)

  return () => clearInterval(interval)
}

export const readInput = memoize(readInputRaw, { maxAge: 5000, preFetch: true })
