import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseApp } from "../../base";
import { MainContext } from "../../App";
import { Link, NavLink, withRouter } from "react-router-dom";

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
        // this.props.onLogin(user.email);
        //this.props.navigation.goBack();
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
            <input
              type="submit"
              className="button is-success full-width"
              value="Login"
            />
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
      <div className="login__container p-3 box">
        <h2 className="title has-text-centered mb-2">Login with</h2>
        <div className="field is-grouped is-grouped-centered mb-3">
          <p className="control">
            <a className="button is-large is-light">Facebook</a>
          </p>
          <p className="control">
            <a className="button is-large is-light">Google</a>
          </p>
        </div>
        {loginWithEmail}
        <p className="m-a">
          Not a member? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
