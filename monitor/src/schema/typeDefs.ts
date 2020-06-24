import { gql } from 'apollo-server'

const typeDefs = gql`
  type State {
    temperature: Temperature!
    pressure: Pressure!
  }

  type Temperature {
    kelvin: Float!
    celsius: Float!
    fahrenheit: Float!
  }

  type Pressure {
    psi: Float!
  }

  type Query {
    state: State!
  }
`

export default typeDefs
