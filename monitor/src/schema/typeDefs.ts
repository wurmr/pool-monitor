import { gql } from 'apollo-server'

const typeDefs = gql`
  type State {
    temperature: Temperature!
    pressure: Float!
  }

  type Temperature {
    kelvin: Float!
    celsius: Float!
    fahrenheit: Float!
  }

  type Query {
    state: State!
  }
`

export default typeDefs
