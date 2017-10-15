import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectFieldGroup = ({ name, onChange, options, label, error, selected }) => {
    return (

        <div className = {classnames("form-group", { 'has-error' : error })}>
            <label className = "control-label">{label}</label>
            <select
                name = {name}
                className = "form-control"
                onChange = {onChange}>
                <option value = "" disabled>Choose your TimeZone</option>
                {
                    options.map((val) => {
                        return (
                            <option key = {`${val.offset}_${val.value}`} value = {val.text}> {val.text}</option>
                        );
                    })
                }
            </select>
            {error && <span className = "help-block">{error}</span>}
        </div>

    );
};

SelectFieldGroup.propTypes = {
    name     : PropTypes.string.isRequired,
    label    : PropTypes.string.isRequired,
    options  : PropTypes.array.isRequired,
    onChange : PropTypes.func.isRequired,
    error    : PropTypes.string,
    selected : PropTypes.string
};
SelectFieldGroup.defaultProps = {};

export default SelectFieldGroup;
