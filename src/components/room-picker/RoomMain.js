import React, { Component } from "react";
import { firebaseApp } from "../../base";
import Navbar from "../navigation/Navbar";

import AuthModal from "../auth/AuthModal";
import RoomPicker from "./RoomPicker";
import RoomCreate from "./RoomCreate";

export class RoomMain extends Component {
  state = {
    modalActive: false
  };
  logOut = () => {
    firebaseApp.auth().signOut();
  };

  onModalToggle = () => {
    this.setState(prevState => ({ modalActive: !prevState.modalActive }));
  };

  render() {
    return (
      <div className="container picker__container box">
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          signOut={this.logOut}
          toggleModal={this.onModalToggle}
        />
        <RoomPicker />
        <RoomCreate />
        <AuthModal
          isActive={this.state.modalActive}
          onClose={this.onModalToggle}
          onSuccess={this.onModalToggle}
        />
      </div>
    );
  }
}

export default RoomMain;
