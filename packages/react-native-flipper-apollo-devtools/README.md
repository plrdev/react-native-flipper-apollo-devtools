## React Native -package to connect Flipper Apollo Client devtools

### Installation guide

1. `npm install --save react-native-flipper-apollo-devtools`
2. Connect your React Native project to flipper plugin in your code:

```
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'

...

enableFlipperApolloDevtools(apolloClient)

```

3. [Install Apollo Client devtools flipper plugin in flipper](../flipper-plugin-apollo-client-devtools)
4. Run your app and see Apollo Devtools plugin in the left pane of Flipper
5. Enable the plugin and go to the pane to see the devtools

## Experimental

Note that currently this is an experimental alpha release and does not have
all the Apollo Client devtools functionality included. Cache tab should
be mostly working, but rest are placeholders. Contributions are welcome!
