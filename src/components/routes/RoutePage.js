import React, { useEffect, useState } from "react";
import "./RoutePage.css";

import { useSelector, useDispatch } from "react-redux";
import * as routeActions from "../../redux/actions/routeActions";
import { useAuth } from "../../contexts/AuthContext";
import RouteList from "./RouteList";
import { Redirect } from "react-router-dom";
import { routeService } from "../../service/routeService";
import { useHistory } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { openSidebar } from "../../redux/actions/sidebarActions";
import useSidebarState from "../sidebar/useSidebarState";
import RouteSidebar from "./sidebar/RouteSidebar";



export default function RoutePage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [redirectToAddNewRoute, setRedirectToAddNewRoute] = useState(false);
  const history = useHistory();
  const [openSidebar] = useSidebarState();

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

  const createNewRoute = () => {
    const sidebar = {
      isOpen: true,
      mode: "create",
      routeId: null
    }
    openSidebar(sidebar);
  }

  function handleDeleteRoute(route) {
    console.log(`ROUTE id: ${route.id} deleted`);
  }

  return (
    <>
      {/* {redirectToAddNewRoute && <Redirect to="/index/route" />} */}
      {/* <h2>Routes</h2> */}

      <div className="routePage">
        <Sidebar>
          <RouteSidebar />
        </Sidebar>

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
              onClick={createNewRoute}
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
