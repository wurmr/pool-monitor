import React from 'react'
import roundTo from 'round-to'

interface PressureGaugeProps {
  pressure: number
}

const PressureGuage = ({ pressure }: PressureGaugeProps) => {
  return <p>{roundTo(pressure, 1)} PSI</p>
}

export default PressureGuage
