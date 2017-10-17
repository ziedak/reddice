import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextFieldGroup = ({ name, type, value, onChange, placeholder, label, error, onBlur }) => {
    return (
        <div className = {classnames("form-group", { 'has-error' : error })}>
            <label className = "control-label">{label}</label>
            <input
                type = {type}
                name = {name}
                className = "form-control"
                placeholder = {placeholder}
                value = {value}
                onChange = {onChange}
                onBlur = {onBlur} />
            {error && <span className = "help-block">{error}</span>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name        : PropTypes.string.isRequired,
    label       : PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired,
    type        : PropTypes.string.isRequired,
    value       : PropTypes.string.isRequired,
    onChange    : PropTypes.func.isRequired,
    onBlur      : PropTypes.func,
    error       : PropTypes.string

};
TextFieldGroup.defaultProps = {
    type        : 'text',
    placeholder : ''
};

export default TextFieldGroup;
