import React from "react";
import "./RouteList.css";
import RouteElement from "./RouteElement";

export default function RouteList({ routes, onDeleteClick }) {
  return (
    <>
      {routes.map((route) => {
        return <RouteElement route={route} key={route.id} />;
      })}
    </>
  );
}
