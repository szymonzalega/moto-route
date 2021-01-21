import React from "react";
import "./MainPage.scss";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "../header/Header";
import RoutePage from "../routes/RoutePage";
import UserProfile from "../user/UserProfile";
import UpdateProfile from "../user/UpdateProfile";

export default function Dashboard() {
  let { path } = useRouteMatch();

  return (
    <main>
      <Header />
      <Switch>
        <Route exact path={path}>
          <h3>Dashboard</h3>
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
    </main>
  );
}