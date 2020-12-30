import React, { useState } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import * as userActions from "../redux/actions/userActions";
import HomeIcon from "@material-ui/icons/Home";
import TerrainIcon from "@material-ui/icons/Terrain";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState(() =>
    getCurrentPath(location.pathname)
  );

  let { path, url } = useRouteMatch();

  console.log("url" + url + "   path" + path + " header");

  function getCurrentPath(path) {
    const currentPath = path.split("/")[2];
    return currentPath ? currentPath : "dashboard";
  }

  function redirectToView(item) {
    history.push(item.path);
    setActiveView(item.id);
  }

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

  let items = [
    {
      id: "dashboard",
      path: "/index",
      text: "Dashboard",
      icon: <HomeIcon fontSize="large" />,
    },
    {
      id: "routes",
      path: "/index/routes",
      text: "Routes",
      icon: <TerrainIcon fontSize="large" />,
    },
    {
      id: "user-profile",
      path: "/index/user-profile",
      text: "Profile",
      icon: <PersonIcon fontSize="large" />,
    },
  ];

  return (
    <div className="header">
      <div className="header__left">
        {/* {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`header__element ${
                activeView === item.id ? "header__element--active" : ""
              }`}
              onClick={() => redirectToView(item)}
            >
              {item.icon}
              <span className="header__text">{item.text}</span>
            </div>
          );
        })} */}

        {/* <Link to="/index/dashboard">Dashboard</Link>
          <Link to="/index/routes">Routes</Link> */}

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
