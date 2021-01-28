import React from "react";
import RouteElement from "./routeElement/RouteElement";
import ContentElement from "../../content/ContentElement";
import { useSelector } from "react-redux";

export default function RouteList() {
  const routes = useSelector((state) => state.routes.routes);

  return (
    <>
      {routes.map((route) => {
        return (
          <ContentElement key={route.id}>
            <RouteElement route={route} />
          </ContentElement>
        );
      })}
    </>
  );
}
