import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputWithButton from "../common/InputWithButton";

export class SideBar extends Component {
  state = {
    newchannel: "",
    filter: "",
    filteredChannels: []
  };
  static propTypes = {
    channels: PropTypes.array.isRequired
  };

  componentWillReceiveProps(newProps) {
    if (
      newProps.channels.length !== this.state.filteredChannels.length &&
      newProps.channels.length > 0
    ) {
      this.setState({ filteredChannels: newProps.channels });
    }
  }
  onNewChannelChange = e => {
    const newChannel = e.target.value;
    this.setState(() => ({ newChannel }));
  };

  onInputChange = e => {
    const { value } = e.target;

    if (e.target.name === "filter") {
      this.setState({ filter: value }, this.updateFilter);
    } else {
      this.setState({ [e.target.name]: value });
    }
  };

  updateFilter = () => {
    const { filter } = this.state;
    const filteredChannels = this.props.channels.filter(channel =>
      channel.includes(filter)
    );
    this.setState({ filteredChannels });
  };

  createChannel = e => {
    e.preventDefault();
    this.props.onCreateChannel(this.state.newChannel);
    this.setState({ newChannel: "" });
  };

  render() {
    const { roomId, ariaExpanded } = this.props;
    const { filteredChannels, filter, newchannel } = this.state;
    return (
      <nav className="chatroom__navigation" aria-expanded={ariaExpanded}>
        <div className="card bg-transparent">
          <header className="card-header">
            <p className="card-header-title">{roomId}</p>
            <a className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </a>
          </header>
        </div>
        <aside className="menu mt-2 prl-1">
          <p className="menu-label is-size-5">Rooms</p>
          <TextFieldGroup
            name="filter"
            placeholder="Find a room"
            onChange={this.onInputChange}
            value={filter}
            type="text"
            iconRight="fa-search"
            hasIconsRight="has-icons-right"
            hasIconsLeft=""
          />
          <ul className="menu-list">
            {filteredChannels.length > 0 &&
              filteredChannels.map(channel => (
                <li key={channel}>
                  <NavLink to={`/room/${roomId}/${channel}`}>
                    # {channel}
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className="">
            <form onSubmit={this.createChannel}>
              <InputWithButton
                placeholder="Room name"
                type="text"
                name="newchannel"
                buttonText="Create"
                value={newchannel}
                onChange={this.onInputChange}
              />
            </form>
          </div>
        </aside>
        <div id="channels" className="channels" />
      </nav>
    );
  }
}

export default SideBar;
