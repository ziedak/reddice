import axios from "axios";

export default function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    }
}