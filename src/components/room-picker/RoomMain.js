import React, { Component } from 'react';
import { firebaseApp } from '../../base';
import Navbar from '../navigation/Navbar';

import AuthModal from '../auth/AuthModal';
import RoomPicker from './RoomPicker';
import RoomCreate from './RoomCreate';

export class RoomMain extends Component {
	state = {
		modalActive: false,
		height: 100
	};
	componentDidMount() {
		this.setHeight();
		window.addEventListener('resize', this.setHeight.bind(this));
	}
	setHeight = () => {
		const height = window.innerHeight;
		this.setState({ height });
	};

	getHeight = () => {
		return { '--var-height': this.state.height + 'px' };
	};
	logOut = () => {
		firebaseApp.auth().signOut();
	};

	onModalToggle = () => {
		this.setState((prevState) => ({ modalActive: !prevState.modalActive }));
	};

	render() {
		return (
			<div className="container picker__container box" style={this.getHeight()}>
				<Navbar isAuthenticated={this.props.isAuthenticated} signOut={this.logOut} toggleModal={this.onModalToggle} />
				<RoomPicker isAuthenticated={this.props.isAuthenticated} />
				<RoomCreate isAuthenticated={this.props.isAuthenticated} />
				<p className="text-center about__text">
					A simple chat application made with react & firebase. Made by{' '}
					<a href="https://www.barisozcetin.me">Baris Ozcetin</a>
				</p>
				<AuthModal isActive={this.state.modalActive} onClose={this.onModalToggle} onSuccess={this.onModalToggle} />
			</div>
		);
	}
}

export default RoomMain;
