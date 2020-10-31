import React from "react";
import "./RouteElement.css";
import RouteElementNav from "./RouteElementNav";
import RouteElementInfo from "./RouteElementInfo";

export default function RouteElement({ route }) {
  return (
    <>
      <div className="route">
        <RouteElementNav route={route} />
        <div className="route__map"></div>
        <RouteElementInfo route={route}/>
      </div>
    </>
  );
}
