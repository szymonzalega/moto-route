import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../redux/actions/routeActions";

export default function RoutePage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state);

  useEffect(() => {
    if (state && state.route && state.route.length === 0) {
      dispatch(routeActions.loadRoutes());
    }
  }, [dispatch, state]);

  return (
    <>
      <div>RoutePagee</div>

      <ul>
        {state.route.map((route) => (
          <li>{route.name}</li>
        ))}
      </ul>
    </>
  );
}
