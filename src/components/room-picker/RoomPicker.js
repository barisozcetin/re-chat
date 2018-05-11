import React, { Component } from "react";
import { firebaseApp } from "../../base";
import base from "../../base";
import { Link, NavLink, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

export class RoomPicker extends Component {
  state = {
    channel: "",
    errors: {}
  };
  onSubmit = e => {
    e.preventDefault();
  };

  logOut = () => {
    firebaseApp.auth().signOut();
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onJoin = e => {
    e.preventDefault();
    const { history } = this.props;
    base
      .fetch(`channels/${this.state.channel}`, {
        context: this,
        asArray: true
      })
      .then(response => {
        if (response.length > 0) {
          const channelLink = `/room/${this.state.channel}`;
          this.props.history.push(channelLink);
        } else {
          this.setState({
            errors: {
              ...this.state.errors,
              joinChannel: "No channel found with this name"
            }
          });
          console.log("No channel found with this name");
        }
      });
  };

  render() {
    return (
      <div className="container picker__container box">
        <div className="join">
          <h2>Join a channel</h2>
          <form onSubmit={this.onJoin} className="form-flex">
            <TextFieldGroup
              name="channel"
              placeholder="Channel Name"
              onChange={this.onInputChange}
              value={this.state.channel}
              type="text"
              icon="fa-envelope"
              error={this.state.errors.joinChannel}
            />

            <input type="submit" value="Connect" />
          </form>
        </div>
        <div className="create">
          <h2>Crete a channel</h2>
          <form className="form-flex">
            <TextFieldGroup
              name="channel"
              placeholder="Channel Name"
              onChange={this.onInputChange}
              value={this.state.channel}
              type="text"
              icon="fa-envelope"
            />
            <input type="checkbox" name="" id="" />
            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RoomPicker);
