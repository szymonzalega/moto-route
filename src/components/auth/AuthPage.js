import React from "react";
import "./AuthPage.scss";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";

import { useAuth } from "../../contexts/AuthContext";

export default function HomePage() {
  const { currentUser } = useAuth();
  const history = useHistory();
  let { path } = useRouteMatch();

  console.log(`path ${path}`);

  const redirectToIndex = function () {
    history.push("/index");
  };

  return (
    <>
      {currentUser ? (
        redirectToIndex()
      ) : (
        <>
          <div className="authPage__background"></div>
          {/* <div className="authPage__content"> */}
          <Switch>
            <Route exact path={path}>
              <Home />
            </Route>
            <Route path={`${path}/signup`}>
              <Signup />
            </Route>
            <Route path={`${path}/login`}>
              <Login />
            </Route>
            <Route path={`${path}/forgot-password`}>
              <ForgotPassword />
            </Route>
          </Switch>
          {/* </div> */}
        </>
      )}
    </>
  );
}
