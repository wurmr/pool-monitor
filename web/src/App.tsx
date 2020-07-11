import React, { useRef, useEffect, useState } from 'react'
import './App.css'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import TemperatureGauge from './Components/TemperatureGuage'
import PressureGuage from './Components/PressureGuage'
import MA from 'moving-average'

const STATE = gql`
  {
    state {
      temperature {
        fahrenheit
      }
      pressure {
        psi
      }
      adc {
        tempetureChannel: channel(id: 0) {
          millivolts: value
        }
        pressureChannel: channel(id: 3) {
          millivolts: value
        }
      }
    }
  }
`

interface QueryData {
  state: State
}

interface State {
  temperature: {
    fahrenheit: number
  }
  pressure: {
    psi: number
  }
  adc: {
    tempetureChannel: {
      millivolts: number
    }
    pressureChannel: {
      millivolts: number
    }
  }
}

interface Averages {
  temperature: number
  pressure: number
}

function App() {
  const { loading, error, data } = useQuery<QueryData>(STATE, {
    pollInterval: 1000,
  })

  const timeInterval = 20 * 1000 // 20 seconds
  const mTemperture = useRef(MA(timeInterval))
  const maPressure = useRef(MA(timeInterval))
  const [state, setState] = useState<State>()
  const [averages, setAverages] = useState<Averages>()

  useEffect(() => {
    if (!data) return

    mTemperture.current.push(Date.now(), data.state.temperature.fahrenheit)
    maPressure.current.push(Date.now(), data.state.pressure.psi)

    setAverages({
      temperature: mTemperture.current.movingAverage(),
      pressure: maPressure.current.movingAverage(),
    })
    setState(data.state)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error || !state || !data || !averages) return <p>Error :(</p>

  return (
    <div className="App">
      <header className="App-header">
        <TemperatureGauge
          temperature={averages.temperature}
          millivolts={state.adc.tempetureChannel.millivolts}
        />
        <PressureGuage
          pressure={averages.pressure}
          millivolts={state.adc.pressureChannel.millivolts}
        />
      </header>
    </div>
  )
}

export default App
