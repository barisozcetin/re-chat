import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseApp } from "../../base";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class SignUp extends Component {
  static propTypes = {
    isModal: PropTypes.bool,
    switchComponent: PropTypes.func
  };

  state = {
    email: "",
    password: "",
    password2: "",
    method: "email",
    errors: {}
  };

  onSignUp = e => {
    e.preventDefault();
    const { email, password, password2, errors } = this.state;
    if (password !== password2) {
      this.setState({
        errors: { ...errors, password2: "Passwords should match" }
      });
      return false;
    }
    this.setState({ errors: {} });
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push("/login");
      })
      .catch(error => {
        if (error.code.includes("password")) {
          this.setState({
            errors: { ...errors, password: error.message }
          });
        }
        if (error.code.includes("email")) {
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
    const { errors, email, password, password2 } = this.state;
    const loginWithEmail = (
      <form onSubmit={this.onSignUp}>
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
        <TextFieldGroup
          name="password2"
          placeholder="Confirm Password"
          onChange={this.onInputChange}
          value={password2}
          type="password"
          error={errors.password2}
          icon="fa-lock"
        />
        <div className="field">
          <p className="control">
            <input
              type="submit"
              className="button is-success full-width"
              value="Sign Up"
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
        <h2 className="title has-text-centered mb-2">Sign Up</h2>
        {loginWithEmail}
        <p className="m-a">
          Already have an account?{" "}
          {this.props.isModal ? (
            <a onClick={this.props.switchComponent}>Login</a>
          ) : (
            <Link to="/signup">Login</Link>
          )}
        </p>
      </div>
    );
  }
}

export default withRouter(SignUp);
