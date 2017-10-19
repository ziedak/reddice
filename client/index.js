import React from "react";
import { render } from "react-dom";
import { browserHistory, Router } from "react-router";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import jwt from "jsonwebtoken";
import { setCurrentUser } from "./actions/AuthAction";
import routes from "./routes";

//define the store
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk), // dispatch async actions
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
if ( localStorage.jwtToken ) {
    setAuthorizationToken(localStorage.jwtToken);
   store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
    <Provider store = {store}>
        <Router history = {browserHistory} routes = {routes} />
    </Provider>
    , document.getElementById('app'));

