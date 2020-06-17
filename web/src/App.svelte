<script>
  import ApolloClient, { gql } from "apollo-boost"
  import Temperature from "./Temperature"
  import Pressure from "./Pressure"

  const client = new ApolloClient({
    uri: "http://localhost:4000"
  })

  let temperature
  let pressure

  client
    .query({
      query: gql`
        {
          state {
            temperature
            pressure
          }
        }
      `
    })
    .then(r => {
      temperature = r.data.state.temperature
      pressure = r.data.state.pressure
    })
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>

<main>
  <Temperature {temperature} />
  <Pressure {pressure} />
</main>
