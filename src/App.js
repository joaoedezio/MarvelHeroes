import React from "react";
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Root from "./components/Root";
import reducers from "./reducers/";

import "./styles/helpers/_reseter.scss";

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
