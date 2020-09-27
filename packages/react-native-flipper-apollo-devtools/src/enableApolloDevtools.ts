import { addPlugin, Flipper } from 'react-native-flipper'
import { ApolloClient, NormalizedCache, NormalizedCacheObject } from '@apollo/client'

type ApolloDevtoolCallbackParams = {
  state: any
  dataWithOptimisticResults: any
}

type ApolloDevClient<T> = Omit<ApolloClient<T>, '__actionHookForDevTools'> & {
  __actionHookForDevTools: (params: (arg0: ApolloDevtoolCallbackParams) => any) => void
}

let currentConnection: Flipper.FlipperConnection | null = null
let client: ApolloDevClient<NormalizedCache | NormalizedCacheObject> | null = null
export const enableFlipperApolloDevtools = (
  newClient: ApolloDevClient<NormalizedCache | NormalizedCacheObject>
) => {
  if (client !== newClient) {
    client = newClient

    let counter = 0
    let enqueued = null
    const logger = ({
      state: { queries, mutations },
      dataWithOptimisticResults: inspector,
    }: ApolloDevtoolCallbackParams) => {
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
