import React, {Component} from "react";
import timezones from "../data/timezones";
import PropTypes from 'prop-types';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            timezone: ""
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        //this.setState({username: e.target.value})
    };
    onSubmit = (e) => {
        e.preventDefault();
        //axios.post('api/users', {user: this.state});
        this.props.userSignupRequest(this.state);
    };

    render() {
        const {
            username,
            email,
            password,
            password_confirmation,
            timezone
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label >Username</label>
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
                </div>
                <div className="form-group">
                    <label >Email</label>
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
                </div>
                <div className="form-group">
                    <label >Password</label>
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
                </div>
                <div className="form-group">
                    <label >Password Confirmation</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        aria-describedby="password_confirmation"
                        placeholder="Enter password_confirmation"
                        value={password_confirmation}
                        onChange={this.onChange}/>

                </div>

                <div className="form-group">
                    <label >Time Zones</label>
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

                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
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



