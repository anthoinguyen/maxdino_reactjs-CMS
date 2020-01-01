import React, { Component } from "react";
import { history } from "./redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import Admin from "./layouts";
import Loading from "./components/Loading";
import Login from "./containers/Login";
import ChangePassword from "./containers/ChangePassword";
import CreatePasswordAdmin from "./containers/CreatePasswordAdmin";
import RequestResetPassword from "./containers/RequestResetPassword";
import AcceptResetPassword from "./containers/AcceptResetPassword";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Loading />
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/login" exact component={Login} />
            <Route path="/change-password" exact component={ChangePassword} />
            <Route path="/create-user/:token" component={CreatePasswordAdmin} />
            <Route
              path="/request/reset-password"
              exact
              component={RequestResetPassword}
            />
            <Route
              path="/accept/reset-password/:token"
              component={AcceptResetPassword}
            />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
