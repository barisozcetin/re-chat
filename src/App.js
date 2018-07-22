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
	render() {
		return (
			<MainProvider>
				<div id="app">
					<Router />
				</div>
			</MainProvider>
		);
	}
}

export default App;
