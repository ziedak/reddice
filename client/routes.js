import React from "react";
import { IndexRoute, Route } from "react-router";

import { App, Greetings, Signup } from "./components";

export default (
    <Route path = "/" component = {App}>
        <IndexRoute component = {Greetings} />
        <Route path = "signup" component = {Signup} />

    </Route>


)