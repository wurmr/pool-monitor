import React from 'react'
import roundTo from 'round-to'

const PressureGuage = ({ pressure }: { pressure: number }) => {
  return <p>{roundTo(pressure, 1)} PSI</p>
}

export default PressureGuage
