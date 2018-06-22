import React, { Component } from "react";
import base from "../../base";
import SideBar from "./SideBar";
import MainSection from "./MainSection";

export class ChatRoom extends Component {
  state = {
    roomId: this.props.match.params.roomId,
    channels: [],
    activeChannel: "home",
    messages: [],
    newMessage: "",
    sidebarExpanded: false
  };

  componentDidMount() {
    this.syncChannels();
    this.syncMessages();
    /*  if (this.state.channels.length === 0) {
      this.setState({ channels: ["home"] });
    } */
    if (this.props.match.params.channelId) {
      // TODO: MAKE A CHANNEL CONTROL. IF NOT REDIRECT TO HOME
      this.setState({ activeChannel: this.props.match.params.channelId });
    }
    this.scrollToBottom();
  }

  syncMessages = () => {
    const { roomId, activeChannel } = this.state;
    base.syncState(`messages/${roomId}/${activeChannel}`, {
      context: this,
      state: "messages",
      asArray: true,
      then: () => {
        this.afterLoading();
      }
    });
  };

  syncChannels = () => {
    base.syncState(`channels/${this.state.roomId}/`, {
      context: this,
      state: "channels",
      asArray: true
    });
  };

  onMessageChange = e => {
    const newMessage = e.target.value;
    this.setState(() => ({ newMessage }));
  };

  onMessageSubmit = () => {
    this.setState(
      prevstate => ({
        messages: [...prevstate.messages, prevstate.newMessage],
        newMessage: ""
      }),
      this.scrollToBottom
    );
  };

  afterLoading = () => {
    this.scrollToBottom();
    console.log("loaded");
  };

  scrollToBottom = () => {
    document.getElementById("messages").scrollTo(0, 15000);
  };

  onCreateChannel = newChannel => {
    if (!this.state.channels.includes(newChannel)) {
      this.setState(prevstate => ({
        channels: [...prevstate.channels, newChannel]
      }));
    } else {
      alert("this room is exist");
    }
  };

  toggleSidebarOnMobile = e => {
    this.setState(prevState => ({
      sidebarExpanded: !prevState.sidebarExpanded
    }));
  };

  render() {
    return (
      <div className="chatroom__container">
        <SideBar
          channels={this.state.channels}
          onCreateChannel={this.onCreateChannel}
          roomId={this.state.roomId}
          ariaExpanded={this.state.sidebarExpanded}
        />
        <MainSection
          messages={this.state.messages}
          roomId={this.state.roomId}
          newMessage={this.state.newMessage}
          onMessageChange={this.onMessageChange}
          onMessageSubmit={this.onMessageSubmit}
          onToggle={this.toggleSidebarOnMobile}
        />
      </div>
    );
  }
}

export default ChatRoom;
