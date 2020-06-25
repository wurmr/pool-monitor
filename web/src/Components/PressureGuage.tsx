import React from 'react'
import roundTo from 'round-to'

interface PressureGaugeProps {
  pressure: number
  millivolts: number
}

const PressureGuage = ({ pressure, millivolts }: PressureGaugeProps) => {
  return (
    <p>
      <b>{roundTo(pressure, 1)} PSI</b> <br />
      {roundTo(millivolts, 1)} mv
    </p>
  )
}

export default PressureGuage
