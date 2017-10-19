import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextFieldGroup } from "../common";
import validateInput from "../../../server/shared/validation/LoginValidation";
import { connect } from "react-redux";
import { addFlashMessage, login } from "../../actions";

class LoginFormForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier : "",
            password   : "",
            errors     : {},
            isLoading  : false,
            isInValid  : false
        }
    }

    isValid = () => {
        const { errors, isValid } = validateInput(this.state);

        if ( !isValid ) {
            this.setState({ errors : errors });
        }

        return isValid;
    };
    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };

    onSubmit = (e) => {

        e.preventDefault();
        if ( this.isValid() ) {
            this.setState({ errors : {}, isLoading : true });
            this.props.login(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type : 'success',
                        text : 'You logged in successfully, welcome'
                    });

                    this.context.router.push('/'); //redirection
                },
                (err) => this.setState({ errors : err.response.data.errors, isLoading : false })
                //err.response.data.errors
            );
        }

    };

    render() {
        const {
                  identifier,
                  password,
                  errors,
                  isLoading
              } = this.state;

        return (
            <form onSubmit = {this.onSubmit}>
                {errors.form && <div className = "alert alert-danger">{errors.form}</div> }
                <TextFieldGroup
                    name = "identifier"
                    label = "username / Email"
                    placeholder = "Enter Username / Email"
                    value = {identifier}
                    onChange = {this.onChange}
                    error = {errors.identifier}
                />

                <TextFieldGroup
                    name = "password"
                    label = "password"
                    type = "password"
                    value = {password}
                    onChange = {this.onChange}
                    error = {errors.password}
                />


                <div className = "form-group">
                    <button className = "btn btn-primary btn-lg" disabled = {isLoading }>
                        Login now
                    </button>
                </div>
            </form>
        );
    }
}

LoginFormForm.propTypes = {

    addFlashMessage : PropTypes.func.isRequired,
    login           : PropTypes.func.isRequired
};


LoginFormForm.contextTypes = {
    router : PropTypes.object.isRequired
};
export default connect(null, { addFlashMessage, login })(LoginFormForm);



