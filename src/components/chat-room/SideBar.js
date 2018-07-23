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
		inviteModalActive: false,
		nickName: ''
	};
	static propTypes = {
		channels: PropTypes.array.isRequired
	};

	componentDidMount() {
		// this.setState({ nickName: this.props.nickName });
		// console.log(this.props.nickName);
		// console.log(this.props.nickName);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.channels.length !== this.state.filteredChannels.length && newProps.channels.length > 0) {
			this.setState({ filteredChannels: newProps.channels });
		}
		if (newProps.nickName) {
			// console.log('-----');
			// console.log(newProps.nickName);
			this.setState({ nickName: newProps.nickName });
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

	handleNickChange = (e) => {
		e.preventDefault();
		e.currentTarget.focus();
		e.currentTarget.blur();
		const { nickName } = this.state;
		this.props.changeNick(nickName);
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
					<div className="content">
						<div className="card-content">
							<form onSubmit={this.handleNickChange}>
								<InputWithButton
									placeholder="Nick name"
									type="text"
									name="nickName"
									buttonText="Change"
									value={this.state.nickName}
									onChange={this.onInputChange}
									onClick={this.handleNickChange}
								/>
							</form>
						</div>
					</div>
				</div>
				<aside className="menu prl-1">
					<p className="menu-label is-size-5 text-center" id="channels-lbl">
						Channels
					</p>
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
					<br className="is-hidden-mobile" />
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
