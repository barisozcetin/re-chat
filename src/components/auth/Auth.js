/* import React from "react";

const Auth = props => {
  return <div className="auth__container">{props.children}</div>;
};

export default Auth;


 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { MainContext } from "../../App";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  static propTypes = {};

  render() {
    return (
      <MainContext.Consumer>
        {context => {
          return context.state.isAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <div className="auth__container">
              {this.props.children.map((child, key) =>
                React.cloneElement(child, {
                  key
                })
              )}
            </div>
          );
        }}
      </MainContext.Consumer>
    );
  }
}

export default Auth;
