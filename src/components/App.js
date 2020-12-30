import React from "react";
import Signup from "./auth/Signup";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./auth/Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./auth/ForgotPassword";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            {/* exact is important */}
            <Route exact path="/">
              <HomePage />
            </Route>
            <PrivateRoute path="/index">
              <Dashboard />
            </PrivateRoute>

            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </div>
            </Container>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
