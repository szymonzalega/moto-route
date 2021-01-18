import React, { useState } from "react";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import {userLogout} from "../../redux/actions/userActions";
import HomeIcon from "@material-ui/icons/Home";
import TerrainIcon from "@material-ui/icons/Terrain";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, NavLink } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      dispatch(userLogout());
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="header">
      <div className="header__left">
        <NavLink
          exact
          to="/index"
          className="header__element"
          activeClassName="header__element--active"
        >
          <HomeIcon fontSize="large" />
          <span className="header__text">Dashboard</span>
        </NavLink>
        <NavLink
          to="/index/routes"
          className="header__element"
          activeClassName="header__element--active"
        >
          <TerrainIcon fontSize="large" />
          <span className="header__text">Routes</span>
        </NavLink>
        <NavLink
          to="/index/user-profile"
          className="header__element"
          activeClassName="header__element--active"
        >
          <PersonIcon fontSize="large" />
          <span className="header__text">Profile</span>
        </NavLink>
      </div>
      <div className="header__right">
        <div
          className="header__element header__element--logout"
          onClick={handleLogout}
        >
          <ExitToAppIcon fontSize="large" />
          {error && (
            <div className="header__logout-error">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
