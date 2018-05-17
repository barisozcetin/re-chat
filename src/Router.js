import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import ChatRoom from "./components/chat-room/ChatRoom";
import RoomPicker from "./components/room-picker/RoomPicker";
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
              <RoomPicker
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
          />
          <PrivateRoute
            path="/room/:roomId/"
            component={ChatRoom}
            isAuthenticated={context.state.isAuthenticated}
            signOut={context.signOut}
          />
          <Route path="/test" component={RoomPicker} />
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
