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
    channel(id: ID!): Channel!
    channels: [Channel!]
  }

  type Channel {
    id: ID!
    value: Float!
  }

  type Subscription {
    temperatureChanged: Temperature!
    pressureChanged: Pressure!
  }

  type Query {
    state: State!
  }
`

export default typeDefs
