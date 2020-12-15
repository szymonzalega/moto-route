import React from "react";
import "./RouteList.css";
import RouteElement from "./routeElement/RouteElement";
import { useSelector } from "react-redux";


export default function RouteList() {

  const routes = useSelector((state) => state.routes.routes)

  return (
    <>
      {routes.map((route) => {
        return <RouteElement route={route} key={route.id} />;
      })}
    </>
  );
}
