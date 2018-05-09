import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseApp } from "../../base";
import { MainContext } from "../../App";
import { Link } from "react-router-dom";

class Login extends Component {
  static propTypes = {};

  state = {
    email: "",
    password: "",
    method: "email"
  };

  onLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.onLogin(user.email);
      });
  };
  changeMethod = () => {
    if (this.state.method === "email") {
      this.setState({ method: "phone" });
    } else {
      this.setState({ method: "email" });
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const loginWithEmail = (
      <form onSubmit={this.onLogin}>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="example@mail.com"
              name="email"
              id="email"
              onChange={this.onInputChange}
              value={this.state.email}
            />
            <span className="icon is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-right">
              <i className="fas fa-check" />
            </span>
          </div>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Password"
              id="password"
              value={this.state.password}
              onChange={this.onInputChange}
              name="password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input type="submit" className="button is-success" value="Login" />
          </p>
        </div>
      </form>
    );
    const loginWithPhone = (
      <form>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="" />
      </form>
    );
    return (
      <div className="login">
        <h2>Login</h2>
        {loginWithEmail}
        <button onClick={this.props.loginRedirect}>Redirect</button>
      </div>
    );
  }
}

export default Login;
