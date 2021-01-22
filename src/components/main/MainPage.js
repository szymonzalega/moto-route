import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "../header/Header";
import Dashboard from "../dashboard/Dashboard";
import RoutePage from "../routes/RoutePage";
import UserProfile from "../user/UserProfile";
import UpdateProfile from "../user/UpdateProfile";

export default function MainPage() {
  let { path } = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={path}>
          <Dashboard />
        </Route>
        <Route path={`${path}/routes`}>
          <RoutePage />
        </Route>
        <Route exact path={`${path}/user-profile`}>
          <UserProfile />
        </Route>
        <Route exact path={`${path}/user-profile/update-profile`}>
          <UpdateProfile />
        </Route>
      </Switch>
    </>
  );
}
