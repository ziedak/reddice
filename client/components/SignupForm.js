import React, { Component } from "react";
import PropTypes from "prop-types";
import { SelectFieldGroup, TextFieldGroup } from "./common";
import validateInput from "../../server/shared/validation/singupValidation";
import timezones from "../data/timezones";
//import { browserHistory } from "react-router";


class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username              : "",
            email                 : "",
            password              : "",
            password_confirmation : "",
            timezone              : "",
            errors                : {},
            isLoading             : false,
            isInValid             : false
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
        //this.setState({username: e.target.value})
    };
    checkUserExist = (e) => {
        const field = e.target.name;
        const val = e.target.value;
        if ( val !== '' ) {
            this.props.isUserExist(val).then(res => {
                let { errors } = this.state;
                let valid = true;
                if ( res.data.user ) {
                    errors[ field ] = 'there is user with such ' + field;
                    valid = false
                } else {
                    errors[ field ] = '';
                }
                this.setState({ errors, isInValid : valid });
            });
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        //axios.post('api/users', {user: this.state});
        if ( this.isValid() ) {
            this.setState({ errors : {}, isLoading : true });
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type : 'success',
                        text : 'You signed up successfully, welcome'
                    });

                    this.context.router.push('/'); //redirection
                },
                (err) => this.setState({ errors : err.response.data, isLoading : false })
                //err.response.data.errors
            );
        }

    };

    render() {
        const {
                  username,
                  email,
                  password,
                  password_confirmation,
                  timezone,
                  errors,
                  isLoading,
                  isInValid
              } = this.state;
        return (
            <form onSubmit = {this.onSubmit}>

                <TextFieldGroup
                    name = "username"
                    label = "username"
                    placeholder = "Enter Username"
                    value = {username}
                    onChange = {this.onChange}
                    error = {errors.username}
                    onBlur = {this.checkUserExist}
                />

                <TextFieldGroup
                    name = "email"
                    label = "email"
                    placeholder = "Enter email"
                    value = {email}
                    onChange = {this.onChange}
                    error = {errors.email}
                    onBlur = {this.checkUserExist}
                />
                <TextFieldGroup
                    name = "password"
                    label = "password"
                    type = "password"
                    value = {password}
                    onChange = {this.onChange}
                    error = {errors.password} />

                <TextFieldGroup
                    name = "password_confirmation"
                    label = "password confirmation"
                    type = "password"
                    value = {password_confirmation}
                    onChange = {this.onChange}
                    error = {errors.password_confirmation} />

                <SelectFieldGroup
                    name = "timezone"
                    label = "timezone confirmation"
                    onChange = {this.onChange}
                    error = {errors.timezone}
                    options = {timezones}
                    selected = {timezone} />

                <div className = "form-group">
                    <button className = "btn btn-primary btn-lg" disabled = {isLoading || isInValid}>
                        Join now
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest : PropTypes.func.isRequired,
    addFlashMessage   : PropTypes.func.isRequired,
    isUserExist       : PropTypes.func.isRequired
};


SignupForm.contextTypes = {
    router : PropTypes.object.isRequired
};
export default SignupForm;



