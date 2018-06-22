import React from "react";

const InviteModal = props => {
  return (
    <div className={`modal ${props.isActive && "is-active"}`}>
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content chatroom__modal">
        <div className="box modal__box grid">
          <div className="select is-multiple">
            <select multiple size="8">
              <option value="Argentina">Argentina</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Brazil">Brazil</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Guyana">Guyana</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Suriname">Suriname</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Venezuela">Venezuela</option>
            </select>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.onClose}
      />
    </div>
  );
};

export default InviteModal;
