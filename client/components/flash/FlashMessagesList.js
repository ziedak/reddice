import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FlashMessage from "./FlashMessage";

import {deleteFlashMessage} from "../../actions";

class FlashMessagesList extends Component {
    render() {
        const { messages, deleteFlashMessage } = this.props;
        return (
            <div>
                {
                    messages.map(msg => {
                        return (
                            <FlashMessage
                                key = {msg.id}
                                message = {msg}
                               deleteFlashMessage = {deleteFlashMessage}
                            />);
                    })
                }
            </div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages           : PropTypes.array.isRequired,
   deleteFlashMessage : PropTypes.func.isRequired
};

FlashMessagesList.defaultProps = {};

function mapStateToProps(state) {
    return {
        messages : state.flashMessages
    }
}
/*mapStateToProps = (state) => {
 return {
 messages : state.flashMessages
 }
 };*/
export default connect(mapStateToProps,{deleteFlashMessage} )(FlashMessagesList);
