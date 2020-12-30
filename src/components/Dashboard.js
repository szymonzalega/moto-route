import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import RoutePage from "./routes/RoutePage";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";

export default function Dashboard() {
  let { path } = useRouteMatch();

  return (
    <>
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
    </>
  );
}
