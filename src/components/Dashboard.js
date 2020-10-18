import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import RoutePage from "./RoutePage";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import ManageRoute from "./ManageRoute";
import * as userActions from "../redux/actions/userActions";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  async function handleLogout() {
    setError("");

    try {
      dispatch(userActions.userLogout());
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
        <Route path="/index/routes" component={RoutePage} />
        <Route path="/index/route/:id" component={ManageRoute} />
        <Route path="/index/route" component={ManageRoute} />
        <Route exact path="/index/user-profile" component={UserProfile} />
        <Route
          path="/index/user-profile/update-profile"
          component={UpdateProfile}
        />
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
