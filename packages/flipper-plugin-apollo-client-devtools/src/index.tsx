import React from "react";
import { FlipperPlugin, View, KeyboardActions } from "flipper";
import { App } from "./App";

type State = {};

type Data = {
  counter: number;
  queries: object;
  mutations: object;
  inspector: object;
};

type PersistedState = {
  data: Data;
};

const initialData = { counter: 0, queries: {}, mutations: {}, inspector: {} };

export default class extends FlipperPlugin<State, any, PersistedState> {
  static keyboardActions: KeyboardActions = ["clear"];

  static defaultPersistedState: PersistedState = {
    data: initialData,
  };

  static persistedStateReducer = (
    persistedState: PersistedState,
    method: string,
    data: Data
  ): PersistedState => {
    return {
      ...persistedState,
      data,
    };
  };

  state = {};

  onKeyboardAction = (action: string) => {
    if (action === "clear") {
      this.props.setPersistedState({ data: initialData });
    }
  };

  render() {
    return (
      <View scrollable>
        <App client={this.client} />
      </View>
    );
  }
}
