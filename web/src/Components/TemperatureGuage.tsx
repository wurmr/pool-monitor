import React from 'react'
import roundTo from 'round-to'

interface TemperatureGuageProps {
  temperature: {
    fahrenheit: number
  }
}

const TemperatureGuage = ({ temperature }: TemperatureGuageProps) => {
  return <p>{roundTo(temperature.fahrenheit, 2)} F</p>
}

export default TemperatureGuage
