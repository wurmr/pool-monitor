import React from 'react'
import roundTo from 'round-to'

const TemperatureGuage = ({ temperature }: { temperature: number }) => {
  return <p>{roundTo(temperature, 2)} F</p>
}

export default TemperatureGuage
