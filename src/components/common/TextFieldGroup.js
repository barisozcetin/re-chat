import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	type,
	icon,
	iconRight,
	onChange,
	hasIconsLeft = 'has-icons-left',
	hasIconsRight = '',
	fieldClass,
	autoComplete = 'off'
}) => {
	return (
		<div className={`field ${fieldClass}`}>
			<div className={`control ${hasIconsLeft} ${hasIconsRight}`}>
				<input
					className="input"
					type={type}
					placeholder={placeholder}
					name={name}
					onChange={onChange}
					value={value}
					autoComplete={autoComplete}
				/>
				{icon && (
					<span className="icon is-left">
						<i className={`fas ${icon}`} />
					</span>
				)}
				{iconRight && (
					<span className="icon is-right">
						<i className={`fas ${iconRight}`} />
					</span>
				)}
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
	onChange: PropTypes.func.isRequired,
	fieldClass: PropTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
