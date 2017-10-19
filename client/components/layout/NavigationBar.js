import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/AuthAction";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    };

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className = "nav navbar-nav navbar-right">
                <li><a href = "#" onClick = {this.logout  }>Log Out</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className = "nav navbar-nav navbar-right">
                <li><Link to = "/signup">Sign up</Link></li>
                <li><a href = "/login">Login</a></li>
            </ul>
        );

        return (

            <div>
                <nav className = "navbar navbar-default">
                    <div className = "container-fluid">
                        <div className = "navbar-header">
                            <Link to = "/" className = "navbar-brand" href = "#">WebSiteName</Link>
                        </div>

                        <div className = "collapse navbar-collapse">
                            {isAuthenticated ? userLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        )
            ;
    }

}
NavigationBar.propTypes = {
    auth   : PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return {
        auth : state.authReducer
    }
}
export default  connect(mapStateToProps, { logout })(NavigationBar)
