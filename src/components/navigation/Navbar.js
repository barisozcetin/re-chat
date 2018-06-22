import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signOut: PropTypes.func
  };

  render() {
    const authItems = (
      <button className="bd-tw-button button" onClick={this.props.signOut}>
        <span className="icon">
          <i className="fas fa-sign-out-alt" />
        </span>
        <span>Sign Out</span>
      </button>
    );
    const guestItems = (
      <button className="bd-tw-button button" onClick={this.props.toggleModal}>
        <span className="icon">
          <i className="fas fa-sign-in-alt" />
        </span>
        <span>Sign In / Register</span>
      </button>
    );
    return (
      <nav className="navbar navbar__margin is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="/logof.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="120"
              height="140"
              className="logo"
            />
          </a>
          <div
            className="navbar-burger burger"
            data-target="navbarExampleTransparentExample"
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/documentation/overview/start/">
                Links
              </a>
              <div className="navbar-dropdown is-boxed">
                <a
                  className="navbar-item"
                  href="https://github.com/barisozcetin/re-chat"
                >
                  <span className="icon ">
                    <i class="fab fa-github" />
                  </span>
                  <span>Github</span>
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <button
                    className="bd-tw-button button"
                    data-social-network="Twitter"
                    data-social-action="tweet"
                    data-social-target="http://localhost:4000"
                  >
                    <span className="icon">
                      <i className="fab fa-twitter" />
                    </span>
                    <span>Tweet</span>
                  </button>
                </p>

                <p className="control">
                  {this.props.isAuthenticated ? authItems : guestItems}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
