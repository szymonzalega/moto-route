import React from "react";
import RouteElement from "./routeElement/RouteElement";
import RouteEmptyElement from "./routeElement/RouteEmptyElement";
import ContentElement from "../../content/ContentElement";
import { useSelector } from "react-redux";

export default function RouteList() {
  const routes = useSelector((state) => state.routes.routes);

  return (
    <>
      {routes.length > 0 ? (
        routes.map((route) => (
          <ContentElement key={route.id}>
            <RouteElement route={route} />
          </ContentElement>
        ))
      ) : (
        <ContentElement>
          <RouteEmptyElement message="Oops! You don't have routes yet." />
        </ContentElement>
      )}
    </>
  );
}
