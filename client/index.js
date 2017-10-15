import React from "react";
import { render } from "react-dom";
import { browserHistory, Router } from "react-router";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

import routes from "./routes";

//define the store
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk), // dispatch async actions
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

render(
    <Provider store = {store}>
        <Router history = {browserHistory} routes = {routes} />
    </Provider>
    , document.getElementById('app'));

