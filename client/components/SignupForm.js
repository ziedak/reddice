import React, {Component} from "react";
import timezones from "../data/timezones";
import PropTypes from "prop-types";
import classnames from "classnames";

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            timezone: "",
            errors: {},
            isLoading: false,
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        //this.setState({username: e.target.value})
    };
    onSubmit = (e) => {
        e.preventDefault();
        //axios.post('api/users', {user: this.state});
        this.setState({errors: {}, isLoading: true});
        this.props.userSignupRequest(this.state).then(
            ({data}) => {
                console.log("aaaa", data)
            },
            (err) => this.setState({errors: err.response.data, isLoading: false})
            //err.response.data.errors
        );
    };

    render() {
        const {
            username,
            email,
            password,
            password_confirmation,
            timezone,
            errors,
            isLoading
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>

                <div className={classnames("form-group", {'has-error': errors.username})}>
                    <label className="control-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        aria-describedby="UserName"
                        placeholder="Enter Username"
                        value={username}
                        onChange={this.onChange}/>
                    <small
                        className="form-text text-muted">
                        We'll never share your username with anyone else.
                    </small>
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.email})}>
                    <label className="control-label">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        aria-describedby="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={this.onChange}/>
                    <small
                        className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.password})}>
                    <label className="control-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        aria-describedby="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={this.onChange}/>
                    <small
                        className="form-text text-muted">
                        We'll never share your password with anyone else.
                    </small>
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.password_confirmation})}>
                    <label className="control-label">Password Confirmation</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        aria-describedby="password_confirmation"
                        placeholder="Enter password_confirmation"
                        value={password_confirmation}
                        onChange={this.onChange}/>
                    {errors.password_confirmation && <span className="help-block">{errors.password_confirmation}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.timezone})}>
                    <label className="control-label">Time Zones</label>
                    <select
                        name="timezone"
                        className="form-control"
                        value={timezone}
                        onChange={this.onChange}>
                        <option value="" disabled>Choose your TimeZone</option>
                        {
                            timezones.map((val) => {
                                return (
                                    <option key={`${val.offset}_${val.value}`} value={val.text}> {val.text}</option>
                                );
                            })
                        }
                    </select>
                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>
                        Join now
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};
export default SignupForm;



