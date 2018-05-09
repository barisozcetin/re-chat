import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import ChatRoom from "./components/chat-room/ChatRoom";
import RoomPicker from "./components/room-picker/RoomPicker";
import Auth from "./components/auth/Auth";
import { MainContext } from "./App";

const Router = () => (
  <BrowserRouter>
    <MainContext.Consumer>
      {context => (
        <Switch>
          <Route path="/" exact component={RoomPicker} />
          <Route
            render={props =>
              context.state.user ? (
                <ChatRoom {...props} user={context.state.user} />
              ) : (
                <Link to="/login">Go to login page </Link>
              )
            }
            path="/room/:roomId/:channelId"
          />
          <Route path="/room/:roomId" component={ChatRoom} />
          <Route path="/test" component={RoomPicker} />
          <Route path="/login" component={Auth} />

          <Route path="/signup" component={Auth} />
        </Switch>
      )}
    </MainContext.Consumer>
  </BrowserRouter>
);

export default Router;
