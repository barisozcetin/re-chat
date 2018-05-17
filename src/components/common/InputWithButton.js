import React from "react";
import PropTypes from "prop-types";

const InputWithButton = ({
  type = "string",
  name,
  value = "",
  placeholder,
  buttonText,
  onChange,
  onClick,
  readOnly = false
}) => {
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          className="input"
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
        />
      </div>
      <div className="control">
        <button className="button is-info" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

InputWithButton.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default InputWithButton;
