import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../redux/actions/routeActions";
import { useAuth } from "../contexts/AuthContext";


export default function RoutePage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (state && state.routes && state.routes.length === 0) {
      dispatch(routeActions.loadUserRoutes(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  return (
    <>
      <div>RoutePagee</div>

      <ul>
        {state.routes.map((route) => (
          <li>{route.name}</li>
        ))}
      </ul>
    </>
  );
}
