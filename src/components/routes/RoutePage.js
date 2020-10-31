import React, { useEffect, useState } from "react";
import "./RoutePage.css";

import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../../redux/actions/routeActions";
import { useAuth } from "../../contexts/AuthContext";
import RouteList from "./RouteList";
import { Redirect } from "react-router-dom";
import { routeService } from "../../service/routeService";
import { useHistory } from "react-router-dom";

export default function RoutePage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [redirectToAddNewRoute, setRedirectToAddNewRoute] = useState(false);
  const history = useHistory();

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

  function redirectToNewRoute() {
    history.push("/index/addRoute");
  }

  return (
    <>
      {/* {redirectToAddNewRoute && <Redirect to="/index/route" />} */}
      {/* <h2>Routes</h2> */}

      <div className="routePage">
        <div className="routePage__buttonRow">
          <button
            className="btn btn-primary"
            onClick={() => setRedirectToAddNewRoute(true)}
          >
            Add new route
          </button>

          <button onClick={redirectToNewRoute}>Stwórz nową trasę</button>
        </div>
        <div className="routePage__list">
          <RouteList
            routes={state.routes}
            onDeleteClick={handleDeleteRoute}
          ></RouteList>
        </div>
      </div>
    </>
  );
}
