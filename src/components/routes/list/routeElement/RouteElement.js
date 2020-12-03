import React from "react";
import "./RouteElement.css";
import RouteElementNav from "./nav/RouteElementNav";
import RouteElementInfo from "./info/RouteElementInfo";
import RouteElementMap from "./map/RouteElementMap";
import useSidebarState from "../../../sidebar/useSidebarState";

export default function RouteElement({ route }) {
  const { openSidebar } = useSidebarState();

  const showRouteDetails = (routeId) => {
    const sidebar = {
      isOpen: true,
      mode: "details",
      routeId,
    };
    openSidebar(sidebar);
  };

  return (
    <>
      <div className="route" onClick={() => showRouteDetails(route.id)}>
        <RouteElementNav route={route} />
        <RouteElementMap url={route.url} />
        <RouteElementInfo route={route} />
      </div>
    </>
  );
}
