import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import RouteElementMap from "../routes/RouteElementMap";
import SidebarAddEditMode from "./SidebarAddEditMode";
import SidebarNav from "./SidebarNav";
import SidebarDetailsRow from "./SidebarDetailsRow";
import SidebarPhotoSection from "./SidebarPhotoSection";

export default function Sidebar() {
  const [route, setRoute] = useState({});
  // const [sidebar, setSidebar] = useState({});

  const sidebar = useSelector((state) => state.sidebar);
  const routes = useSelector((state) => state.routes);

  useEffect(() => {
    const getRouteDetails = (routeId) =>
      routes.find((route) => route.id === routeId);
    if (sidebar.routeId) {
      setRoute(getRouteDetails(sidebar.routeId));
    } else {
      setRoute({});
    }
  }, [sidebar, routes]);

  const detailsView = (
    <>
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
    </>
  );

  const addEditMode = (
    <>
      <SidebarNav
        title={sidebar.mode === "create" ? `Create new route` : `Edit route`}
        isEditMode={sidebar.mode !== "details"}
      />
      {route && <SidebarAddEditMode routeId={route.id} />}
    </>
  );

  return (
    <div className={`sidebar ${sidebar.isOpen && "sidebar--visible"}`}>
      {sidebar.isOpen && (
        <>
          {sidebar.mode === "details" && detailsView}
          {sidebar.mode !== "details" && addEditMode}
        </>
      )}
    </div>
  );
}
