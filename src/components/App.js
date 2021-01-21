import React from "react";
import "./App.scss";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./main/MainPage";
import PrivateRoute from "./auth/PrivateRoute";
import AuthPage from "./auth/AuthPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/index" />
            </Route>
            <Route path="/auth">
              <AuthPage />
            </Route>
            <PrivateRoute path="/index">
              <MainPage />
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
