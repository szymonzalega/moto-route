import React from "react";
import "./App.scss";
import Signup from "./auth/Signup";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./auth/ForgotPassword";
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
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
