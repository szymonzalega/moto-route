import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../redux/actions/routeActions";
import { useAuth } from "../contexts/AuthContext";
import RouteList from "./RouteList";


export default function RoutePage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (state && state.routes && state.routes.length === 0) {
      dispatch(routeActions.loadUserRoutes(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  function handleDeleteRoute(route) {
    console.log(`ROUTE id: ${route.id} deleted`);
  }

  return (
    <>
      <h2>Routes</h2>

      <button className="btn btn-primary">Add new route</button>

      <RouteList routes={state.routes} onDeleteClick={handleDeleteRoute}></RouteList>

      {/* <ul>
        {state.routes.map((route) => (
          <li>{route.name}</li>
        ))}
      </ul> */}
    </>
  );
}
