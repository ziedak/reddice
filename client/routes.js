import React from "react";
import { IndexRoute, Route } from "react-router";

import { App, GreetingsPage, SignupPage,LoginPage ,NewEventPage} from "./components";

export default (
    <Route path = "/" component = {App}>
        <IndexRoute component = {GreetingsPage} />
        <Route path = "signup" component = {SignupPage} />
        <Route path = "login" component = {LoginPage} />
        <Route path = "new-event" component = {NewEventPage} />

    </Route>


)