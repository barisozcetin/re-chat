import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import base from '../../base';

import TextFieldGroup from '../common/TextFieldGroup';

class RoomCreate extends Component {
	state = {
		password: '',
		roomName: '',
		privateRoom: false,
		errors: {}
	};

	onOptionChange = () => {
		this.setState((prevState) => ({ privateRoom: !prevState.privateRoom }));
	};

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onCreateClicked = (e) => {
		e.preventDefault();

		if (this.state.roomName.length === 0) return false;

		/// CLEAR ERRORS
		this.setState({ errors: {} });

		/// CHECK IF ROOM IS EXIST
		base.fetch(`rooms/${this.state.roomName}`, {}).then((resp) => {
			if (resp.length > 0) {
				this.setState({
					errors: {
						...this.state.errors,
						roomName: 'A room with this name already exists'
					}
				});
				return false;
			} else {
				base
					.post(`rooms/${this.state.roomName}`, {
						data: [ 'home' ]
					})
					.then(() => {
						this.props.history.push(`/room/${this.state.roomName}/`);
					})
					.catch((err) => console.err);
			}
		});
	};

	render() {
		const roomPassword = (
			<TextFieldGroup
				name="password"
				placeholder="Room Password"
				type="password"
				value={this.state.password}
				onChange={this.onInputChange}
				icon="fas fa-lock"
			/>
		);

		return (
			<section className="picker__section create">
				<h2 className="is-size-4 mb-1 has-text-centered">Crete a room</h2>
				<form method="POST" className="form-flex" onSubmit={this.onCreateClicked}>
					<TextFieldGroup
						name="roomName"
						placeholder="Room Name"
						onChange={this.onInputChange}
						value={this.state.roomName}
						type="text"
						icon="fa-comments"
						error={this.state.errors.roomName}
					/>
					<div className="field is-narrow">
						<div className="control" onChange={this.onOptionChange}>
							<label className="radio">
								<input type="radio" name="member" value="public" defaultChecked /> Public
							</label>
							<label className="radio">
								<input type="radio" name="member" value="private" /> Private
							</label>
						</div>
						<div className="help">
							{!this.state.privateRoom ? 'Everybody can join the room' : 'Only invited users can join the room'}
						</div>
					</div>
					<input type="submit" value="Create" className="button is-primary" disabled={!this.state.roomName.length} />
				</form>
			</section>
		);
	}
}

export default withRouter(RoomCreate);
