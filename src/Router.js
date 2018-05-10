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
          <Route path="/" exact component={RoomPicker} />
          <PrivateRoute
            path="/room/:roomId/:channelId"
            component={ChatRoom}
            isAuthenticated={context.state.isAuthenticated}
          />
          <Route path="/room/:roomId" component={ChatRoom} />
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
