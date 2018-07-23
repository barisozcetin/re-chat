import React, { Component } from 'react';
import Router from './Router';
import { firebaseApp } from './base';
import './App.css';

const MainContext = React.createContext();

class MainProvider extends Component {
	state = {
		isAuthenticated: false,
		user: 'Anonymous',
		nickname: 'Anonymous'
	};

	onLogin = (user) => {
		this.setState({ isAuthenticated: true, user, nickname: 'demo' });
	};

	signOut = () => {
		firebaseApp.auth().signOut().then(() =>
			this.setState({
				isAuthenticated: false,
				user: 'Anonymous'
			})
		);
	};

	componentDidMount() {
		this.removeListener = firebaseApp.auth().onAuthStateChanged((user) => {
			if (user) {
				//TODO: USE checkNickName method here
				this.setState({
					isAuthenticated: true,
					user: user.email,
					nickname: user.email
				});
			} else {
				this.setState({
					isAuthenticated: false,
					user: '',
					nickname: ''
				});
			}
		});
	}

	checkNickName() {
		//TODO: Write a method to check if user already set a nickname. If they did, fetch that name and use it on main provider
	}

	render() {
		return (
			<MainContext.Provider
				value={{
					state: this.state,
					onLogin: this.onLogin,
					signOut: this.signOut
				}}
			>
				{this.props.children}
			</MainContext.Provider>
		);
	}
}

export { MainContext };

class App extends Component {
	state = {
		height: 500
	};

	componentDidMount() {
		this.setHeight();
		window.addEventListener('resize', this.setHeight.bind(this));
	}

	setHeight = () => {
		// this.scrollToBottom();

		const height = window.innerHeight;
		this.setState({ height });
	};

	getHeight = () => {
		return { '--var-height': this.state.height + 'px' };
	};

	render() {
		return (
			<MainProvider>
				<div id="app" style={this.getHeight()}>
					<Router />
				</div>
			</MainProvider>
		);
	}
}

export default App;
