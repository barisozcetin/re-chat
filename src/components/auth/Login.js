import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseApp } from "../../base";
import { MainContext } from "../../App";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  static propTypes = {
    isModal: PropTypes.bool,
    switchComponent: PropTypes.func,
    onSuccess: PropTypes.func
  };

  static defaultProps = {
    isModal: false
  };

  state = {
    email: "",
    password: "",
    method: "email",
    errors: {}
  };

  onLogin = e => {
    e.preventDefault();
    const { email, password, errors } = this.state;
    this.setState({ errors: {} });
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // this.props.onLogin(user.email);
        //this.props.navigation.goBack();
        // if it's modal, close it
        if (this.props.isModal) {
          this.props.onSuccess();
        }
      })
      .catch(error => {
        if (error.code && error.code.includes("password")) {
          this.setState({
            errors: { ...errors, password: error.message }
          });
        }
        if (error.code && error.code.includes("email")) {
          this.setState({
            errors: { ...errors, email: error.message }
          });
        }
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
    const { email, password, errors } = this.state;
    const loginWithEmail = (
      <form onSubmit={this.onLogin}>
        <TextFieldGroup
          name="email"
          placeholder="example@mail.com"
          onChange={this.onInputChange}
          value={email}
          type="email"
          error={errors.email}
          icon="fa-envelope"
        />
        <TextFieldGroup
          name="password"
          placeholder="Password"
          onChange={this.onInputChange}
          value={password}
          type="password"
          error={errors.password}
          icon="fa-lock"
        />
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
            <a className="button is-large is-light">
              <i className="fab fa-facebook-square" />
            </a>
          </p>
          <p className="control">
            <a className="button is-large is-light">
              <i className="fab fa-google" />
            </a>
          </p>
          <p className="control">
            <a className="button is-large is-light">
              <i className="fas fa-phone" />
            </a>
          </p>
        </div>
        {loginWithEmail}
        <p className="m-a">
          Not a member?{" "}
          {this.props.isModal ? (
            <a onClick={this.props.switchComponent}>Sign Up</a>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
