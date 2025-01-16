import { lazy } from "react";
import { Route, Switch } from "wouter";

const Login = lazy(async () => await import("../pages/Login").then(module => ({ default: module.Login })))

export function Routes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
        </Switch>
    )
}