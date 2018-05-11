import React from "react";
import PropTypes from "prop-types";

const InputWithButton = ({ type, name, placeholder, buttonText, onChange }) => {
  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      <div className="control">
        <a className="button is-info">{buttonText}</a>
      </div>
    </div>
  );
};

InputWithButton.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string
};

export default InputWithButton;
