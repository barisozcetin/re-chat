import React, { Component } from "react";
import { firebaseApp } from "../../base";
import base from "../../base";
import { Link, NavLink, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import Navbar from "../navigation/Navbar";

export class RoomPicker extends Component {
  state = {
    channel: "",
    newChannel: "",
    channelType: "public",
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

  onOptionChange = e => {
    this.setState({ channelType: e.target.value });
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
        <Navbar />
        <section className="picker__section join as-c">
          <h2 className="is-size-4 mb-1 has-text-centered">Join a channel</h2>
          <form onSubmit={this.onJoin} className="form-flex">
            <TextFieldGroup
              name="channel"
              placeholder="Channel Name"
              onChange={this.onInputChange}
              value={this.state.channel}
              type="text"
              icon="fa-comments"
              error={this.state.errors.joinChannel}
            />

            <input
              type="submit"
              value="Connect"
              className="button is-primary"
            />
          </form>
        </section>
        <section className="picker__section create as-c">
          <h2 className="is-size-4 mb-1 has-text-centered">Crete a channel</h2>
          <form className="form-flex">
            <TextFieldGroup
              name="channel"
              placeholder="Channel Name"
              onChange={this.onInputChange}
              value={this.state.channel}
              type="text"
              icon="fa-comments"
            />
            <div className="field is-narrow">
              <div className="control" onChange={this.onOptionChange}>
                <label className="radio">
                  <input
                    type="radio"
                    name="member"
                    value="public"
                    defaultChecked
                  />{" "}
                  Public
                </label>
                <label className="radio">
                  <input type="radio" name="member" value="private" /> Private
                </label>
              </div>
              <p className="help">
                {this.state.channelType === "public"
                  ? "Everybody can join the room"
                  : "Only invited people can join"}
              </p>
            </div>
            <input type="submit" value="Create" className="button is-primary" />
          </form>
        </section>
      </div>
    );
  }
}

export default withRouter(RoomPicker);
