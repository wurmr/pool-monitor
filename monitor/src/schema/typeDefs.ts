import { gql } from 'apollo-server'

const typeDefs = gql`
  type State {
    temperature: Float!
    pressure: Float!
  }

  type Query {
    state: State!
  }
`

export default typeDefs
