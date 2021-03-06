// Calibration points. RefRes 4930, Ref Volt 3300, Beta 3880, Therm@Ref 9911
const KELVIN_REFERENCE_TEMP = 298.15
const REFERENCE_RESISTOR = 5030
const REFERENCE_VOLTAGE = 3300
const THERMISTOR_BETA = 3880
const THERMISTOR_AT_REFTEMP = 9911

const getThermistorResistance = (adcInput: number) => {
  return (REFERENCE_RESISTOR * (REFERENCE_VOLTAGE - adcInput)) / adcInput
}

const getDegreesK = (thermistorResistance: number) => {
  return (
    1 /
    (1 / KELVIN_REFERENCE_TEMP +
      (1 / THERMISTOR_BETA) *
        Math.log(thermistorResistance / THERMISTOR_AT_REFTEMP))
  )
}

const getDegreesC = (degreesK: number) => {
  return degreesK - 273.15
}

const getDegreesF = (degreesC: number) => {
  return (9 * degreesC) / 5 + 32
}

export const getTemperature = (adcInput: number) => {
  const resistance = getThermistorResistance(adcInput)
  const kelvin = getDegreesK(resistance)
  const celsius = getDegreesC(kelvin)
  const fahrenheit = getDegreesF(celsius)

  return {
    kelvin,
    celsius,
    fahrenheit,
  }
}
