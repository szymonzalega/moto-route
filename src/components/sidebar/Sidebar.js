import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import {useSelector } from "react-redux";
import RouteElementMap from "../routes/RouteElementMap";
import SidebarAddEditMode from "./SidebarAddEditMode";
import SidebarNav from "./SidebarNav";
import SidebarDetailsRow from "./SidebarDetailsRow";
import SidebarPhotoSection from "./SidebarPhotoSection";

export default function Sidebar() {
  const [route, setRoute] = useState({});
  const [sidebar, setSidebar] = useState({});

  const state = useSelector((state) => state);

  useEffect(() => {
    const getRouteDetails = (routeId) => {
      let route = state.routes.filter((route) => route.id === routeId);
      return route[0];
    };
    setSidebar(state.sidebar);
    setRoute(getRouteDetails(state.sidebar.routeId));
  }, [state]);

  return (
    <div className={`sidebar ${sidebar.isOpen && "sidebar--visible"}`}>
      {sidebar.isOpen && sidebar.mode === "details" ? (
        <div>
          <SidebarNav
            routeId={route.id}
            title={route.name}
            description={route.description}
            isEditMode={sidebar.mode !== "details"}
          />

          <SidebarDetailsRow label="Level" value={route.level} />
          <SidebarDetailsRow label="Author" value={route.userEmail} />
          <SidebarDetailsRow label="Length" value={`${route.length}km`} />
          <SidebarDetailsRow label="Type" value={route.routeType} />

          <RouteElementMap url={route.url} />
          <SidebarPhotoSection photos={route.photos} />
        </div>
      ) : (
        <>
          <SidebarNav
            title="Create new route"
            isEditMode={sidebar.mode !== "details"}
          />
          <SidebarAddEditMode />
        </>
      )}
    </div>
  );
}
