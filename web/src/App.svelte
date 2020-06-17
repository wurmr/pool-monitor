<script>
  import { onMount, onDestroy } from 'svelte'
  import ApolloClient, { gql } from 'apollo-boost'
  import Temperature from './Temperature'
  import Pressure from './Pressure'
  let temperature
  let pressure
  let destruction

  onMount(async () => {
    const client = new ApolloClient({
      uri: 'http://localhost:4000'
    })

    const query = client.watchQuery({
      query: gql`
        {
          state {
            temperature
            pressure
          }
        }
      `
    })

    query.startPolling(5000)
    query.subscribe(result => {
      temperature = result.data.state.temperature
      pressure = result.data.state.pressure
    })

    // this is so wrong
    destruction = () => {
      query.stopPolling()
    }
  })

  onDestroy(() => {
    destruction()
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
