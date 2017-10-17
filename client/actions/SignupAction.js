import axios from "axios";

function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    }
}

function isUserExist(identifier) {
    return dispatch => {
        return axios.get(`/api/users/${identifier}`);
    }
}

export   { userSignupRequest, isUserExist }