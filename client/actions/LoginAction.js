import axios from "axios";

function login(loginData) {
    return dispatch => {
        return axios.post('/api/auth', loginData);
    }
}

export   { login}