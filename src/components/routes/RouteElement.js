import React from "react";
import "./RouteElement.css";
import RouteElementNav from "./RouteElementNav";
import RouteElementInfo from "./RouteElementInfo";
import RouteElementMap from "./RouteElementMap";

export default function RouteElement({ route }) {
  return (
    <>
      <div className="route">
        <RouteElementNav route={route} />
        <RouteElementMap url={route.url} />
        <RouteElementInfo route={route} />
      </div>
    </>
  );
}
