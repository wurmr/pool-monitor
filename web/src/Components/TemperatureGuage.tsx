import React from 'react'
import roundTo from 'round-to'

interface TemperatureGuageProps {
  temperature: number
}

const TemperatureGuage = ({ temperature }: TemperatureGuageProps) => {
  return <p>{roundTo(temperature, 2)} F</p>
}

export default TemperatureGuage
