import React from 'react'
import './App.css'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import TemperatureGauge from './Components/TemperatureGuage'
import PressureGuage from './Components/PressureGuage'

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

function App() {
  const { loading, error, data } = useQuery<QueryData>(STATE, {
    pollInterval: 1000,
  })

  if (loading) return <p>Loading...</p>
  if (error || !data) return <p>Error :(</p>

  return (
    <div className="App">
      <header className="App-header">
        <TemperatureGauge
          temperature={data.state.temperature.fahrenheit}
          millivolts={data.state.adc.tempetureChannel.millivolts}
        />
        <PressureGuage
          pressure={data.state.pressure.psi}
          millivolts={data.state.adc.pressureChannel.millivolts}
        />
      </header>
    </div>
  )
}

export default App
