import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import ChatRoom from "./components/chat-room/ChatRoom";
import RoomMain from "./components/room-picker/RoomMain";
import Auth from "./components/auth/Auth";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { MainContext } from "./App";
import PrivateRoute from "./components/common/PrivateRoute";

const Router = () => (
  <MainContext.Consumer>
    {context => (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <RoomMain
                {...props}
                isAuthenticated={context.state.isAuthenticated}
                signOut={context.signOut}
              />
            )}
          />
          <PrivateRoute
            path="/room/:roomId/:channelId"
            component={ChatRoom}
            isAuthenticated={context.state.isAuthenticated}
            user={context.state.user}
          />
          <PrivateRoute
            path="/room/:roomId/"
            component={ChatRoom}
            isAuthenticated={context.state.isAuthenticated}
            signOut={context.signOut}
            user={context.state.user}
          />
          <Auth>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
          </Auth>
        </Switch>
      </BrowserRouter>
    )}
  </MainContext.Consumer>
);

export default Router;
