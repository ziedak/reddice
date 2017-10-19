import React from "react";
import { IndexRoute, Route } from "react-router";

import { App, GreetingsPage, LoginPage, NewEventPage, SignupPage } from "./components";

import requireAuth from "./utils/requireAuth";

export default (
    <Route path = "/" component = {App}>
        <IndexRoute component = {GreetingsPage} />
        <Route path = "signup" component = {SignupPage} />
        <Route path = "login" component = {LoginPage} />
        <Route path = "new-event" component = {requireAuth(NewEventPage)} />

    </Route>


)