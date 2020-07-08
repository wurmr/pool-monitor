// Value (mv) at 0 PSI (180)
const MV_ZERO_READING = 180

// Value (mv) at 30 PSI (1860)
const MV_FULL_SCALE = 1860

// Meter Full Scale (PSI) (30)
const PSI_FULL_SCALE = 30

export const getPressure = (adcInput: number) => {
  const psi =
    ((adcInput - MV_ZERO_READING) * PSI_FULL_SCALE) /
    (MV_FULL_SCALE - MV_ZERO_READING)
  return {
    psi,
  }
}
