import React from "react";
import { Link } from "react-router-dom";

const ChatroomHeader = props => {
  return (
    <div className="chatroom__header">
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src="/logof.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </Link>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={props.onToggle}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbarExampleTransparentExample"
          className="navbar-menu justify-content-center"
        >
          <div className="navbar-start ml-auto">
            {" "}
            <Link className="navbar-item bold" to={props.pageUrl}>
              {props.roomId}
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <Link className="bd-tw-button button is-hidden-mobile" to="/">
                  <span className="icon">
                    <i className="fas fa-home" />
                  </span>
                  <span>Home</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChatroomHeader;
