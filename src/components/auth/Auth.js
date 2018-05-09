import React, { Component } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import SignUp from "./SignUp";
import { MainContext } from "../../App";

export class Auth extends Component {
  static propTypes = {};

  state = {};

  onSignupComplete = () => {
    this.props.history.push("/login");
  };

  loginRedirect = () => {
    this.props.history.push("/room/yenioada/home");
  };

  render() {
    const operation = this.props.match.path;
    const content =
      operation === "/login" ? (
        <Login />
      ) : (
        <SignUp onComplete={this.onSignupComplete} />
      );

    return (
      <MainContext.Consumer>
        {context => (
          <Login onLogin={context.onLogin} loginRedirect={this.loginRedirect} />
        )}
      </MainContext.Consumer>
    );
  }
}

export default Auth;
