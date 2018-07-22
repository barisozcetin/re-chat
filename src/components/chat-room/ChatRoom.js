import React, { Component } from 'react';
import base from '../../base';
import SideBar from './SideBar';
import MainSection from './MainSection';
import { withRouter } from 'react-router-dom';
export class ChatRoom extends Component {
	state = {
		roomId: this.props.match.params.roomId,
		channels: [],
		activeChannel: '',
		messages: [],
		newMessage: '',
		sidebarExpanded: false,
		isPrivate: false,
		allowedUsers: [],
		height: 100
	};

	componentDidUpdate(prevProps) {
		if (this.props.match.params.channelId !== prevProps.match.params.channelId) {
			base.removeBinding(this.syncRef);
			this.syncRef = this.syncMessages(this.props.match.params.channelId);
		}
	}

	componentDidMount() {
		this.setHeight();
		window.addEventListener('resize', this.setHeight.bind(this));
		const isPrivate = base
			.fetch(`/config/${this.props.match.params.roomId}/private`, {
				context: this
			})
			.then((data) => {
				this.setState({ isPrivate: data === true ? true : false });
				if (data == 'true' && (!this.props.user || this.props.user === 'Anonymous')) {
					this.props.history.push('/');
				} else {
					this.syncAllowedUsers();
				}
				return data;
			});
		if (this.props.match.params.channelId) {
			// TODO: MAKE A CHANNEL CONTROL. IF NOT REDIRECT TO HOME
			this.setState(
				(prevState) => ({
					activeChannel: this.props.match.params.channelId
				}),
				() => {
					this.syncRef = this.syncMessages(this.props.match.params.channelId);
				}
			);
		} else {
			this.setState({ activeChannel: 'home' }, () => (this.syncRef = this.syncMessages()));
		}
		this.syncChannels();
		this.scrollToBottom();
	}

	syncAllowedUsers = () => {
		base.syncState(`config/${this.props.match.params.roomId}/users`, {
			context: this,
			state: 'allowedUsers',
			asArray: true,
			then: () => {
				this.afterLoading();
			}
		});
	};

	syncMessages = (channelId = 'home') => {
		const { roomId } = this.state;
		const channel = this.props.match.params.channelId || 'home';

		return (this.sync = base.syncState(`messages/${roomId}/${channelId}`, {
			context: this,
			state: 'messages',
			asArray: true,
			then: () => {
				this.afterLoading();
			}
		}));
	};

	syncChannels = () => {
		base.syncState(`rooms/${this.state.roomId}/`, {
			context: this,
			state: 'channels',
			asArray: true
		});
	};

	onMessageChange = (e) => {
		const newMessage = e.target.value;
		this.setState(() => ({ newMessage }));
	};

	onMessageSubmit = () => {
		const user = this.props.user;
		const date = new Date().toGMTString();
		this.setState(
			(prevstate) => ({
				messages: [ ...prevstate.messages, { user, message: prevstate.newMessage, date } ],
				newMessage: ''
			}),
			this.scrollToBottom
		);
	};

	afterLoading = () => {
		this.scrollToBottom();
		// console.log("loaded");
	};

	scrollToBottom = () => {
		document.getElementById('messages').scrollTo(0, 15000);
	};

	onCreateChannel = (newChannel) => {
		if (!this.state.channels.includes(newChannel)) {
			this.setState((prevstate) => ({
				channels: [ ...prevstate.channels, newChannel ]
			}));
		} else {
			alert('this channel is exist');
		}
	};

	toggleSidebarOnMobile = (e) => {
		this.setState((prevState) => ({
			sidebarExpanded: !prevState.sidebarExpanded
		}));
	};

	addAllowedUser = (user) => {
		this.setState((prevState) => ({
			allowedUsers: [ ...prevState.allowedUsers, user ]
		}));
	};

	setHeight = () => {
		const height = window.innerHeight;
		this.setState({ height });
	};

	getHeight = () => {
		return { '--var-height': this.state.height + 'px' };
	};

	render() {
		return (
			<div className="chatroom__container" style={this.getHeight()}>
				<SideBar
					channels={this.state.channels}
					onCreateChannel={this.onCreateChannel}
					roomId={this.state.roomId}
					ariaExpanded={this.state.sidebarExpanded}
					onAddAllowedUser={this.addAllowedUser}
					isPrivate={this.state.isPrivate}
				/>
				<MainSection
					messages={this.state.messages}
					roomId={this.state.roomId}
					newMessage={this.state.newMessage}
					onMessageChange={this.onMessageChange}
					onMessageSubmit={this.onMessageSubmit}
					onToggle={this.toggleSidebarOnMobile}
					pageUrl={this.props.match.url}
				/>
			</div>
		);
	}
}

export default withRouter(ChatRoom);
