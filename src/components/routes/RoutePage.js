import React, { useEffect, useState } from "react";
import "./RoutePage.css";

import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../../redux/actions/routeActions";
import { useAuth } from "../../contexts/AuthContext";
import RouteList from "./RouteList";
import { Redirect } from "react-router-dom";
import { routeService } from "../../service/routeService";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function RoutePage() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [redirectToAddNewRoute, setRedirectToAddNewRoute] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async function anyName() {
      try {
        if (state && state.routes && state.routes.length === 0) {
          await dispatch(routeActions.loadUserRoutes(currentUser.uid));
        }
      } catch (e) {
        console.error(`Loading routes failed ${e}`);
      }
    })();
  }, [currentUser, dispatch, state])

  useEffect(() => {
    setSidebarVisible(state.sidebar.isOpen);
  }, [state]);

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
        <div className="routePage__sidebar">{sidebarVisible && <Sidebar />}</div>

        <div className="routePage__list">
          <div className="routePage__buttonRow">
            {/* <button
              className="btn btn-primary"
              onClick={() => setRedirectToAddNewRoute(true)}
            >
              Add new route
            </button> */}
            
            <button
              className="btn btn-primary"
              onClick={redirectToNewRoute}
            >
              Add new route
            </button>
          </div>
          <RouteList
            routes={state.routes}
            onDeleteClick={handleDeleteRoute}
          ></RouteList>
        </div>
      </div>
    </>
  );
}
