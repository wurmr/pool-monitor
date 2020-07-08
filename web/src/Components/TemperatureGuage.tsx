import React from 'react'
import roundTo from 'round-to'

interface TemperatureGuageProps {
  temperature: number
  millivolts: number
}

const TemperatureGuage = ({
  temperature,
  millivolts,
}: TemperatureGuageProps) => {
  return (
    <p>
      <b>{roundTo(temperature, 1)} F</b>
      <br />
      {roundTo(millivolts, 1)} mv
    </p>
  )
}

export default TemperatureGuage
