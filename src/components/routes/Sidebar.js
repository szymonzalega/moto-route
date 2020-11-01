import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import * as sidebarActions from "../../redux/actions/sidebarActions";


export default function Sidebar() {
  const [route, setRoute] = useState({});

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getRouteDetails = (routeId) => {
      let route = state.routes.filter((route) => route.id === routeId);
      return route[0];
    };
    setRoute(getRouteDetails(state.sidebar.routeId));
  }, [state]);

  const closeSidebar = () => {
    dispatch(sidebarActions.closeSidebar())
  };

  return (
    <div className="sidebar">
        <div className="sidebar__nav">
        <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={closeSidebar}
      >
        <CloseIcon />
      </IconButton>
        </div>
      {route && route.name}
      
    </div>
  );
}
