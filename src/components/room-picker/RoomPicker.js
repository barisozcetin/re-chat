import React, { Component } from "react";
import { firebaseApp } from "../../base";
import base from "../../base";
import { Link, NavLink, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import Navbar from "../navigation/Navbar";
import RoomCreate from "./RoomCreate";

export class RoomPicker extends Component {
  state = {
    room: "",
    newRoom: "",
    roomType: "public",
    errors: {},
    password: "",
    privateRoom: false
  };
  onSubmit = e => {
    e.preventDefault();
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onOptionChange = e => {
    this.setState({ roomType: e.target.value });
  };

  onJoin = e => {
    e.preventDefault();
    const { history } = this.props;
    if (!this.state.room || this.state.room.length === 0) return false;
    base
      .fetch(`rooms/${this.state.room}`, {
        context: this,
        asArray: true
      })
      .then(response => {
        // CHECK IF ROOM EXIST
        if (response.length > 0) {
          base
            .fetch(`config/${this.state.room}/private`, {
              context: this,
              asArray: false
            })
            .then(resp => {
              // CHECK IF ROOM PRIVATE
              if (resp === true) {
                if (!this.props.isAuthenticated) {
                  this.setState({
                    privateRoom: true,
                    errors: {
                      ...this.state.errors,
                      private: "This room is private. Login to enter"
                    }
                  });
                } else {
                  const roomLink = `/room/${this.state.room}`;
                  history.push(roomLink);
                }
              } else {
                const roomLink = `/room/${this.state.room}`;
                history.push(roomLink);
              }
            });
        } else {
          this.setState({
            errors: {
              ...this.state.errors,
              joinRoom: "No room found with this name"
            }
          });
          console.log("No room found with this name");
        }
      });
  };

  render() {
    return (
      <section className="picker__section join as-c">
        <h2 className="is-size-4 mb-1 has-text-centered">Join a room</h2>
        <form onSubmit={this.onJoin} className="form-flex">
          <TextFieldGroup
            name="room"
            placeholder="Room Name"
            onChange={this.onInputChange}
            value={this.state.room}
            type="text"
            icon="fa-comments"
            error={this.state.errors.joinRoom}
          />
          {this.state.errors.private && this.state.errors.private}
          <input
            type="submit"
            value="Connect"
            className="button is-primary"
            disabled={!this.state.room.length}
          />
        </form>
      </section>
    );
  }
}

export default withRouter(RoomPicker);
