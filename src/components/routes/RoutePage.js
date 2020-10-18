import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../../redux/actions/routeActions";
import { useAuth } from "../../contexts/AuthContext";
import RouteList from "./RouteList";
import { Redirect } from "react-router-dom";

export default function RoutePage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [redirectToAddNewRoute, setRedirectToAddNewRoute] = useState(false);

  useEffect(() => {
    return async () => {
      try {
        if (state && state.routes && state.routes.length === 0) {
          await dispatch(routeActions.loadUserRoutes(currentUser.uid));
        }
      } catch (e) {
        console.error(`Loading routes failed ${e}`);
      }
    };
  }, [dispatch, currentUser]);

  function handleDeleteRoute(route) {
    console.log(`ROUTE id: ${route.id} deleted`);
  }

  return (
    <>
      {redirectToAddNewRoute && <Redirect to="/index/route" />}
      <h2>Routes</h2>

      <button
        className="btn btn-primary"
        onClick={() => setRedirectToAddNewRoute(true)}
      >
        Add new route
      </button>

      <RouteList
        routes={state.routes}
        onDeleteClick={handleDeleteRoute}
      ></RouteList>

      {/* <ul>
        {state.routes.map((route) => (
          <li>{route.name}</li>
        ))}
      </ul> */}
    </>
  );
}
