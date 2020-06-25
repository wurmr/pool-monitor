import React from 'react'
import roundTo from 'round-to'

interface PressureGaugeProps {
  pressure: {
    psi: number
    millivolts: number
  }
}

const PressureGuage = ({ pressure }: PressureGaugeProps) => {
  return (
    <p>
      <b>{roundTo(pressure.psi, 1)} PSI</b> <br />
      {roundTo(pressure.millivolts, 1)} mv
    </p>
  )
}

export default PressureGuage
