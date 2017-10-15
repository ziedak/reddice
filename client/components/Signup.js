import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { addFlashMessage, userSignupRequest } from "../actions";
import PropTypes from "prop-types";


class Signup extends Component {
    render() {
        const { userSignupRequest,addFlashMessage } = this.props;
        return (
            <div className = "row">
                <div className = "col-md-4 col-md-offset-4">
                    <SignupForm
                        userSignupRequest = {userSignupRequest}
                        addFlashMessage={addFlashMessage}
                    />
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    userSignupRequest : PropTypes.func.isRequired,
    addFlashMessage   : PropTypes.func.isRequired
};
export default connect(null, { userSignupRequest, addFlashMessage })(Signup);

