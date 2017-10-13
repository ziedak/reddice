import React from "react";
import {render} from "react-dom";
import {browserHistory, Router} from "react-router";
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import routes from "./routes";

//define the store
const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk) // dispatch async actions
);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.getElementById('app'));

