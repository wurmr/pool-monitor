import React from 'react'
import './App.css'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import TemperatureGauge from './Components/TemperatureGuage'
import PressureGuage from './Components/PressureGuage'

const STATE = gql`
  {
    state {
      temperature
      pressure
    }
  }
`

interface QueryData {
  state: State
}

interface State {
  temperature: number
  pressure: number
}

function App() {
  const { loading, error, data } = useQuery<QueryData>(STATE, {
    pollInterval: 5000,
  })

  if (loading) return <p>Loading...</p>
  if (error || !data) return <p>Error :(</p>

  return (
    <div className="App">
      <header className="App-header">
        <TemperatureGauge temperature={data.state.temperature} />
        <PressureGuage pressure={data.state.pressure} />
      </header>
    </div>
  )
}

export default App
