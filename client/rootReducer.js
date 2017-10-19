import { combineReducers } from "redux";
import flashMessages from "./reducers/flashMessages";
import authReducer from "./reducers/authReducer";

export default combineReducers({
    flashMessages,
    authReducer
});