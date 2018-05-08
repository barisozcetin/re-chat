import React from "react";
import PropTypes from "prop-types";

const MainSection = props => {
  return (
    <main className="chatroom__main">
      <div className="chatroom__header">
        <h2>{props.roomId}</h2>
      </div>
      <div className="chatroom__messages" id="messages">
        <ul>
          {props.messages.length > 0 &&
            props.messages.map((msg, key) => <li key={key}>{msg}</li>)}
        </ul>
      </div>
      <div className="chatroom__new-message">
        <form
          className="chatroom__form"
          onSubmit={e => {
            e.preventDefault();
            props.onMessageSubmit();
          }}
        >
          <input
            type="text"
            className="chatroom__text-area"
            value={props.newMessage}
            onChange={props.onMessageChange}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </main>
  );
};

MainSection.propTypes = {
  messages: PropTypes.array.isRequired,
  newMessage: PropTypes.string.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired
};

export default MainSection;
