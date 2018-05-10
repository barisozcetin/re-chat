import { Route, Redirect } from "react-router-dom";

import React, { Component } from "react";

export class PrivateRoute extends Component {
  state = {
    loading: true,
    authState: null
  };
  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty("isAuthenticated")) {
      this.setState({ authState: newProps.isAuthenticated });
    }
  }
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.state.authState === false ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} {...rest} />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
