import React from "react";
import "./RouteElement.css";
import RouteElementNav from "./RouteElementNav";
import RouteElementInfo from "./RouteElementInfo";
import RouteElementMap from "./RouteElementMap";
import { useDispatch } from "react-redux";
import { openSidebar } from "../../redux/actions/sidebarActions";



export default function RouteElement({ route }) {

  const dispatch = useDispatch();

  const showRouteDetails = (routeId) => {
    const sidebar = {
      isOpen: true,
      routeId
    }
    dispatch(openSidebar(sidebar));
  }

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
