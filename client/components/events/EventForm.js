import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFlashMessage, createEvent } from "../../actions";
import { TextFieldGroup } from "../common";

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title     : "",
            errors    : {},
            isLoading : false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };

    onSubmit = (e) => {

        e.preventDefault();

        this.props.createEvent(this.state).then(
            () => {
                this.props.addFlashMessage({
                                               type : 'success',
                                               text : 'You Created the new Event successfully,'
                                           });

                this.context.router.push('/'); //redirection
            },
            //(err) => this.setState({ errors : err.response.data.errors, isLoading : false })
            //err.response.data.errors
        );
    };

    render() {
        const { title, errors, isLoading } = this.state;

        return (
            <form onSubmit = {this.onSubmit}>
                <h1>Create new Event</h1>
                {errors.form && <div className = "alert alert-danger">{errors.form}</div> }
                <TextFieldGroup
                    name = "title"
                    label = "Title"
                    placeholder = "Enter title"
                    value = {title}
                    onChange = {this.onChange}
                    error = {errors.title}
                />

                <div className = "form-group">
                    <button className = "btn btn-primary btn-lg" disabled = {isLoading }>
                        Create
                    </button>
                </div>
            </form>
        );
    }
}

EventForm.propTypes = {
    createEvent     : PropTypes.func.isRequired,
    addFlashMessage : PropTypes.func.isRequired
};
EventForm.defaultProps = {};

EventForm.contextTypes = {
    router : PropTypes.object.isRequired
};
export default  connect(null, { createEvent, addFlashMessage })(EventForm);

