import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export class componentName extends Component {
  state = {
    newChannel: ""
  };
  static propTypes = {
    channels: PropTypes.array.isRequired
  };
  onNewChannelChange = e => {
    const newChannel = e.target.value;
    this.setState(() => ({ newChannel }));
  };
  createChannel = e => {
    e.preventDefault();
    this.props.onCreateChannel(this.state.newChannel);
    this.setState({ newChannel: "" });
  };

  render() {
    const { channels, roomId } = this.props;
    return (
      <nav className="chatroom__navigation">
        <div id="channels" className="channels">
          <ul className="channels__list">
            {channels.length > 0 &&
              channels.map(channel => (
                <li key={channel}>
                  <NavLink to={`/room/${roomId}/${channel}`}>{channel}</NavLink>
                </li>
              ))}
          </ul>
          <form onSubmit={this.createChannel}>
            <input
              type="text"
              value={this.state.newChannel}
              onChange={this.onNewChannelChange}
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </nav>
    );
  }
}

export default componentName;
