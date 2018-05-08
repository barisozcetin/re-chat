import React, { Component } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import firebase from "firebase";
import { firebaseApp } from "../../base";

export class Auth extends Component {
  static propTypes = {};

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    console.log(`${provider}AuthProvider`);
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    return (
      <div>
        <Login authenticate={this.authenticate} />
      </div>
    );
  }
}

export default Auth;
