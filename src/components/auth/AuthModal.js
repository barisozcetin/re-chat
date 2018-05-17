import React, { Component } from "react";
import InputWithButton from "../common/InputWithButton";
import Login from "./Login";
import SignUp from "./SignUp";

export class inviteModal extends Component {
  state = {
    component: "login"
  };
  switchComponent = () => {
    const component = this.state.component === "login" ? "register" : "login";
    this.setState({ component });
  };
  render() {
    return (
      <div className={`modal ${this.props.isActive && "is-active"}`}>
        <div className="modal-background" onClick={this.props.onClose} />
        <div className="modal-content">
          {this.state.component === "login" ? (
            <Login isModal={true} switchComponent={this.switchComponent} />
          ) : (
            <SignUp isModal={true} switchComponent={this.switchComponent} />
          )}
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.props.onClose}
        />
      </div>
    );
  }
}

export default inviteModal;
