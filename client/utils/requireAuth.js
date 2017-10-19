import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFlashMessage } from "../actions";

export default function (ComposedComponent) {

    class Authenticate extends Component {
        constructor(props) {
            super(props);

        }

        componentWillMount() {
            if ( !this.props.isAuthenticated ) {
                this.props.addFlashMessage({
                                               type : 'error',
                                               text : 'You need to login to access this page'
                                           });
                this.context.router.push('/login'); //redirection
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                this.context.router.push('/'); //redirection
            }
        }

        render() {
            return (
                <ComposedComponent{...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated : PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    };

    Authenticate.contextTypes = {
        router : PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            isAuthenticated : state.authReducer.isAuthenticated
        }
    }

    return connect(mapStateToProps,{addFlashMessage})(Authenticate);
}