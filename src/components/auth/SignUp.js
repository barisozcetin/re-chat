import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseApp } from "../../base";
import { withRouter, Link } from "react-router-dom";

class SignUp extends Component {
  static propTypes = {};

  state = {
    email: "",
    password: "",
    password2: "",
    method: "email",
    errors: {}
  };

  shouldComponentUpdate() {
    return true;
  }

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
    const { errors } = this.state;
    const loginWithEmail = (
      <form onSubmit={this.onSignUp}>
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
          {errors.email && <p className="help is-danger">{errors.email}</p>}
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
          {errors.password && (
            <p className="help is-danger">{errors.password}</p>
          )}
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              id="password2"
              value={this.state.password2}
              onChange={this.onInputChange}
              name="password2"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
          {errors.password2 && (
            <p className="help is-danger">{errors.password2}</p>
          )}
        </div>
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
          Already have an account? <Link to="/login"> Click to login</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(SignUp);
