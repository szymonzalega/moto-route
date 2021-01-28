import React, { useState } from "react";
import "./User.scss";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import ContentElement from "../content/ContentElement";

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
    <div className="userProfile">
      <ContentElement>
        <div className="userProfile__content">
          <strong>Email: </strong>
          {currentUser.email}

          <div className="content__buttonRow">
            <Link to="/index/user-profile/update-profile">
              <Button className="w-100">Update profile</Button>
            </Link>
            <div className="w-100 text-center mt-2">
              <Link onClick={handleLogout}>Logout</Link>
            </div>
            {error && (
              <div className="userProfile__content--error">{error}</div>
            )}
          </div>
        </div>
      </ContentElement>
    </div>
  );
}
