import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SidebarNav from "../sidebar/nav/SidebarNav";
import SidebarDetailsRow from "../sidebar/detailsRow/SidebarDetailsRow";
import SidebarPhotoSection from "../sidebar/photoSection/SidebarPhotoSection";
import RouteElementMap from "../list/routeElement/map/RouteElementMap";
import SidebarAddEditMode from "../sidebar/addEditMode/SidebarAddEditMode";

export default function RouteSidebar() {
  const [route, setRoute] = useState({});
  const routes = useSelector((state) => state.routes.routes);
  const sidebar = useSelector((state) => state.sidebar);

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
      {route && (
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
          <SidebarPhotoSection />
        </>
      )}
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
    <>
      {sidebar.mode === "details" && detailsView}
      {(sidebar.mode === "create" || sidebar.mode === "edit") && addEditMode}
    </>
  );
}
