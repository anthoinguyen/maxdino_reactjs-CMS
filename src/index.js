import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import 'bootstrap-css-only/css/bootstrap.min.css';
import "./assets/css/material-dashboard-react.css?v=1.7.0";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
