import { Route, Redirect } from 'react-router-dom';

import React, { Component } from 'react';

export class PrivateRoute extends Component {
	state = {
		loading: true,
		authState: null
	};
	componentWillReceiveProps(newProps) {
		if (newProps.hasOwnProperty('isAuthenticated')) {
			this.setState({ authState: newProps.isAuthenticated });
		}
	}
	//! THIS COMPONENT ALLOWS ME TO MAKE LOGIN CHECK ON ROUTER. BUT FOR NOW I'LL KEEP IT DISABLED BY MAKING THE CONTROL BELOW NON-FUNCTIONAL
	render() {
		const { component: Component, isAuthenticated, ...rest } = this.props;
		return (
			<Route
				{...rest}
				render={(props) =>
					this.state.authState === 'iDidThisToBrokeFunctionality' ? (
						<Redirect to="/login" />
					) : (
						<Component {...props} {...rest} />
					)}
			/>
		);
	}
}

export default PrivateRoute;
