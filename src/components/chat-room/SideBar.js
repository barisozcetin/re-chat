import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputWithButton from "../common/InputWithButton";
import ShareModal from "./ShareModal";

export class SideBar extends Component {
  state = {
    newChannel: "",
    filter: "",
    filteredChannels: [],
    modalActive: false
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
    const channel = this.state.newChannel;
    this.props.onCreateChannel(channel);
    this.setState({ newChannel: "" });
  };

  toggleModal = () => {
    this.setState(prevState => ({ modalActive: !prevState.modalActive }));
  };

  render() {
    const { roomId, ariaExpanded } = this.props;
    const { filteredChannels, filter, newChannel } = this.state;
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
          <p className="menu-label is-size-5">Channels</p>
          <TextFieldGroup
            name="filter"
            placeholder="Find a channel"
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
                placeholder="Channel name"
                type="text"
                name="newChannel"
                buttonText="Create"
                value={newChannel}
                onChange={this.onInputChange}
              />
            </form>
          </div>
          <br />
          <div className="share">
            <button
              className="button is-transparent"
              onClick={this.toggleModal}
            >
              <span>Share</span>
              <span className="icon is-small">
                <i className="fas fa-share" />
              </span>
            </button>
            <button
              className="button is-transparent"
              onClick={this.toggleModal}
            >
              <span>Invite</span>
              <span className="icon is-small">
                <i className="fas fa-share" />
              </span>
            </button>
          </div>
        </aside>
        <ShareModal
          roomId={roomId}
          isActive={this.state.modalActive}
          onClose={this.toggleModal}
        />
      </nav>
    );
  }
}

export default SideBar;
