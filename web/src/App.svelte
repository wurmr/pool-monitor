<script>
  import { onMount } from "svelte"
  import ApolloClient, { gql } from "apollo-boost"
  import Temperature from "./Temperature"
  import Pressure from "./Pressure"
  let temperature
  let pressure
  const a = Object.assign({})

  onMount(async () => {
    const client = new ApolloClient({
      uri: "http://localhost:4000"
    })

    const result = await client.query({
      query: gql`
        {
          state {
            temperature
            pressure
          }
        }
      `
    })

    temperature = result.data.state.temperature
    pressure = result.data.state.pressure
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
