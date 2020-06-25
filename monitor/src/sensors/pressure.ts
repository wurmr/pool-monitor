const MAX_READING = 2048

export const getPressure = (adcInput: number) => {
  const psi = ((adcInput - 256) * 30) / MAX_READING

  return {
    psi,
  }
}
