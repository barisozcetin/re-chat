import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputWithButton from '../common/InputWithButton';
import ShareModal from './ShareModal';
import InviteModal from './InviteModal';

export class SideBar extends Component {
	state = {
		newChannel: '',
		filter: '',
		filteredChannels: [],
		shareModalActive: false,
		inviteModalActive: false
	};
	static propTypes = {
		channels: PropTypes.array.isRequired
	};

	componentWillReceiveProps(newProps) {
		if (newProps.channels.length !== this.state.filteredChannels.length && newProps.channels.length > 0) {
			this.setState({ filteredChannels: newProps.channels });
		}
	}
	onNewChannelChange = (e) => {
		const newChannel = e.target.value;
		this.setState(() => ({ newChannel }));
	};

	onInputChange = (e) => {
		const { value } = e.target;

		if (e.target.name === 'filter') {
			this.setState({ filter: value }, this.updateFilter);
		} else {
			this.setState({ [e.target.name]: value });
		}
	};

	updateFilter = () => {
		const { filter } = this.state;
		const filteredChannels = this.props.channels.filter((channel) => channel.includes(filter));
		this.setState({ filteredChannels });
	};

	createChannel = (e) => {
		e.preventDefault();
		const channel = this.state.newChannel;
		this.props.onCreateChannel(channel);
		this.setState({ newChannel: '' });
	};

	toggleModal = (modalName) => {
		const action = modalName === 'shareModal' ? 'shareModalActive' : 'inviteModalActive';
		console.log(action);
		this.setState((prevState) => ({
			[action]: !prevState[action]
		}));
	};

	allowUser = () => {
		this.props.onAddAllowedUser('baris@hotmail.com');
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
					<div className="card-content">
						<div className="content">
							<InputWithButton
								placeholder="Channel name"
								type="text"
								name="newChannel"
								buttonText="Change"
								value="nickname"
								onChange={this.onInputChange}
							/>
						</div>
					</div>
				</div>
				<aside className="menu mt-2 prl-1">
					<p className="menu-label is-size-5 text-center">Channels</p>
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
					<ul className="channel-list">
						{filteredChannels.length > 0 &&
							filteredChannels.map((channel) => (
								<li className="animated fadeIn" key={channel}>
									<NavLink to={`/room/${roomId}/${channel}`}># {channel}</NavLink>
								</li>
							))}
					</ul>
					<div className="mt-1">
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
					<div className="sidebar__share flex">
						<button className="button is-transparent flex-1" onClick={() => this.toggleModal('shareModal')}>
							<span>Share</span>
							<span className="icon is-small">
								<i className="fas fa-share" />
							</span>
						</button>
						{this.props.isPrivate && (
							<button className="button is-transparent flex-1" onClick={() => this.toggleModal('inviteModal')}>
								<span>Invite</span>
								<span className="icon is-small">
									<i className="fas fa-share" />
								</span>
							</button>
						)}
					</div>
				</aside>
				<ShareModal
					roomId={roomId}
					isActive={this.state.shareModalActive}
					onClose={() => this.toggleModal('shareModal')}
				/>
				<InviteModal
					roomId={roomId}
					isActive={this.state.inviteModalActive}
					onClose={() => this.toggleModal('inviteModal')}
				/>
			</nav>
		);
	}
}

export default SideBar;
