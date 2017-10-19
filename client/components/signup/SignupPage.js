import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { addFlashMessage, isUserExist, userSignupRequest } from "../../actions/index";
import PropTypes from "prop-types";


class SignupPage extends Component {
    render() {
        const { userSignupRequest, addFlashMessage, isUserExist } = this.props;
        return (
            <div className = "row">
                <div className = "col-md-4 col-md-offset-4">
                    <SignupForm
                        userSignupRequest = {userSignupRequest}
                        addFlashMessage = {addFlashMessage}
                        isUserExist = {isUserExist}
                    />
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest : PropTypes.func.isRequired,
    addFlashMessage   : PropTypes.func.isRequired,
    isUserExist       : PropTypes.func.isRequired
};
export default connect(null, { userSignupRequest, addFlashMessage, isUserExist })(SignupPage);

