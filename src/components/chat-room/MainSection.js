import React from "react";
import PropTypes from "prop-types";
import ChatroomHeader from "./ChatroomHeader";

const MainSection = props => {
  return (
    <div className="chatroom__main">
      <ChatroomHeader roomId={props.roomId} onToggle={props.onToggle} />
      <div className="chatroom__messages" id="messages">
        <ul>
          {props.messages.length > 0 &&
            props.messages.map((msg, key) => (
              <li key={key}>
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img
                            src="https://bulma.io/images/placeholders/96x96.png"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-size-4 is-marginless	">
                          John Smith{" "}
                          <small className="is-size-6">
                            {" "}
                            @ 11:09 PM - 1 Jan 2016
                          </small>
                        </p>

                        <div className="message-text">
                          {msg} <a>@bulmaio</a>.
                          <a href="#">#css</a> <a href="#">#responsive</a>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="chatroom__new-message field is-grouped">
        <form
          className="chatroom__form"
          onSubmit={e => {
            e.preventDefault();
            props.onMessageSubmit();
          }}
        >
          <textarea
            type="text"
            className="textarea"
            rows="3"
            value={props.newMessage}
            onChange={props.onMessageChange}
          />
          <input type="submit" value="Send" className="button is-primary" />
        </form>
      </div>
    </div>
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
