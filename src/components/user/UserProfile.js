import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

export default function UserProfile() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  async function handleLogout() {
    setError("");
    try {
      dispatch(userLogout());
      await logout();
      history.push("/auth/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        <strong>Email: </strong>
        {console.log(currentUser)}
        {currentUser.email}
        <Link
          to="/index/user-profile/update-profile"
          className="btn btn-primary w-100 mt-3"
        >
          Update Profile
        </Link>
        <Button className="btn btn-primary w-100 mt-3" onClick={handleLogout}>
          Logout
        </Button>
      </Card.Body>
    </Card>
  );
}
