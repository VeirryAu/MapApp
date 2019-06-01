import fetch from 'node-fetch'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:8000',
  fetch
})

export default client
