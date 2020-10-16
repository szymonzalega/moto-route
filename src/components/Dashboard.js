import React, { useState } from "react";
import {  Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Route, Switch } from "react-router-dom";
import Header from "./Header";
import RoutePage from "./RoutePage";
import UserProfile from "./UserProfile";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/route" component={RoutePage} />
        <Route path="/user-profile" component={UserProfile} />
      </Switch>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
