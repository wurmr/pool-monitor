import { gql } from 'apollo-server'

const typeDefs = gql`
  type State {
    temperature: Temperature!
    pressure: Pressure!
    adc: ADC!
  }

  type Temperature {
    kelvin: Float!
    celsius: Float!
    fahrenheit: Float!
  }

  type Pressure {
    psi: Float!
  }

  type ADC {
    channels: [Channel]!
  }

  type Channel {
    id: ID!
    value: Float!
  }

  type Query {
    state: State!
  }
`

export default typeDefs
