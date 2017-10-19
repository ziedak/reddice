import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwt from "jsonwebtoken";
import { SET_CURRENT_USER } from "./types";


function setCurrentUser(user) {
    return {
        type : SET_CURRENT_USER,
        user
    }
}
function login(loginData) {
    return dispatch => {
        return axios.post('/api/auth', loginData).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}

function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}
export{ setCurrentUser, login, logout }
