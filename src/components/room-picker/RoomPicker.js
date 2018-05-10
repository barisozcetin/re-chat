import React, { Component } from "react";
import { firebaseApp } from "../../base";

export class RoomPicker extends Component {
  onSubmit = e => {
    e.preventDefault();
  };

  logOut = () => {
    firebaseApp.auth().signOut();
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Room Name" />
          <input type="submit" value="Connect" />
        </form>
        <button onClick={this.logOut}>Log out</button>
      </div>
    );
  }
}

export default RoomPicker;
