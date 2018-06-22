import React, { Component } from "react";
import InputWithButton from "../common/InputWithButton";

export class ShareModal extends Component {
  render() {
    return (
      <div className={`modal ${this.props.isActive && "is-active"}`}>
        <div className="modal-background" onClick={this.props.onClose} />
        <div className="modal-content chatroom__modal">
          <div className="box modal__box grid">
            <InputWithButton
              type="string"
              name="room-link"
              value={`http://localhost:3000/room/${this.props.roomId}`}
              buttonText="Copy Link"
              readOnly={true}
              onClick={() => alert("copied")}
              extraClass="align-center"
            />

            <div className="flex pbt-1">
              <button className="button is-large flex-1 mr-1">Facebook</button>
              <button className="button is-large flex-1">Twitter</button>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.props.onClose}
        />
      </div>
    );
  }
}

export default ShareModal;
