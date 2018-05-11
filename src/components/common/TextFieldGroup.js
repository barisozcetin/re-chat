import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  icon,
  onChange
}) => {
  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
        <span className="icon is-left">
          <i className={`fas ${icon}`} />
        </span>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
