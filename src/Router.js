import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatRoom from "./components/chat-room/ChatRoom";
import RoomPicker from "./components/room-picker/RoomPicker";
import Auth from "./components/auth/Auth";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={RoomPicker} />
      <Route path="/room/:roomId/:channelId" component={ChatRoom} />
      <Route path="/room/:roomId" component={ChatRoom} />
      <Route path="/test" component={RoomPicker} />
      <Route path="/login" component={Auth} />
    </Switch>
  </BrowserRouter>
);

export default Router;
