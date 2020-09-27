import { addPlugin, Flipper } from 'react-native-flipper'
import { ApolloClient, NormalizedCache, NormalizedCacheObject } from '@apollo/client'

type Client = ApolloClient<NormalizedCache | NormalizedCacheObject>

let currentConnection: Flipper.FlipperConnection | null = null
let client: Client | null = null
export const enableFlipperApolloDevtools = (newClient: Client) => {
  if (client !== newClient) {
    client = newClient

    let counter = 0
    let enqueued = null
    const logger = ({ state: { queries, mutations }, dataWithOptimisticResults: inspector }) => {
      counter++
      enqueued = {
        counter,
        queries,
        mutations,
        inspector,
      }
      if (currentConnection !== null) {
        currentConnection.send('broadcast:new', enqueued)
      }
    }
    client.__actionHookForDevTools(logger)
  }
  if (currentConnection === null) {
    addPlugin({
      getId() {
        return 'apollo-client-devtools'
      },
      onConnect(connection) {
        currentConnection = connection
      },
      onDisconnect() {
        currentConnection = null
      },
      runInBackground() {
        return false
      },
    })
  }
}
