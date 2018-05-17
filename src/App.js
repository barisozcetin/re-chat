import React, { Component } from "react";
import Router from "./Router";
import { firebaseApp } from "./base";
import "./App.css";

const MainContext = React.createContext();

class MainProvider extends Component {
  state = {
    isAuthenticated: false,
    user: ""
  };

  onLogin = user => {
    this.setState({ isAuthenticated: true, user });
  };

  signOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() =>
        this.setState({
          isAuthenticated: false,
          user: ""
        })
      );
  };

  componentDidMount() {
    this.removeListener = firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          user: user.email
        });
      } else {
        this.setState({
          isAuthenticated: false,
          user: ""
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
