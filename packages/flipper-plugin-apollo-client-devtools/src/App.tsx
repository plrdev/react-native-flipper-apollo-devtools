import React, { useState, useEffect } from "react";
import { PluginClient } from "flipper";
import Bridge from "./devtools/bridge";
import { BridgeProvider } from "./devtools/components/bridge";
import { StorageContextProvider } from "./devtools/context/StorageContextProvider";
import Panel from "./devtools/components/Panel";

type Props = {
  client: PluginClient;
};

export const App = ({ client }: Props) => {
  const [listeners, setListeners] = useState<Array<Function>>([]);
  const [shell, setShell] = useState({
    connect: (cb: Function) => {
      cb(bridge);
    },
    onReload: () => {},
    localStorage,
  });
  const [bridge, setBridge] = useState(
    () =>
      new Bridge({
        listen(fn: Function) {
          const listener = (evt) => {
            if (
              evt.data.source === "apollo-devtools-backend" &&
              evt.data.payload
            ) {
              console.log("listener captured an event: ", evt);
              fn(evt.data.payload);
            }
          };
          window.addEventListener("message", listener);
          setListeners([...listeners, listener]);
        },
        send(data: object) {
          console.log("sending data", data);
          window.postMessage(
            {
              source: "apollo-devtools-backend",
              payload: data,
            },
            "*"
          );
        },
      })
  );
  useEffect(() => {
    shell.connect((bridge: Bridge) => {
      bridge.send("ready", "3.0.0");
    });
    client.subscribe("broadcast:new", (data) => {
      console.log("broadcast:new received .. ", data);
      bridge?.send("broadcast:new", data);
    });
  }, [shell]);

  console.log({ client });
  // return <div>Dev tools!</div>;
  if (bridge === undefined && shell === undefined) {
    return null;
  }
  return (
    <BridgeProvider bridge={bridge}>
      <StorageContextProvider storage={shell.localStorage}>
        <Panel isChrome={false} bridge={bridge} theme={"light"} />
      </StorageContextProvider>
    </BridgeProvider>
  );
};
