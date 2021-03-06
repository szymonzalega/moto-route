import React, { useEffect } from "react";
import "./RoutePage.scss";

import { useSelector, useDispatch } from "react-redux";
import { fetchRoutes } from "../../redux/actions/routeActions";
import { useAuth } from "../../contexts/AuthContext";
import RouteList from "./list/RouteList";
import Content from "../content/Content";
import Sidebar from "../sidebar/Sidebar";
import useSidebarState from "../sidebar/useSidebarState";
import RouteSidebar from "./sidebar/RouteSidebar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function RoutePage() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { openSidebar } = useSidebarState();
  let { path } = useRouteMatch();

  const fetchStatus = useSelector((state) => state.routes.fetchStatus);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchRoutes(currentUser.uid));
    }
  }, []);

  let routeListContent;

  if (fetchStatus === "pending") {
    routeListContent = <CircularProgress />;
  }
  if (fetchStatus === "succeeded") {
    routeListContent = <RouteList></RouteList>;
  } else if (fetchStatus === "failed") {
    routeListContent = (
      <div className="routePage__message--error">
        Error while fetching routes
      </div>
    );
  }

  const createNewRoute = () => {
    const sidebar = {
      isOpen: true,
      mode: "create",
      routeId: null,
    };
    openSidebar(sidebar);
  };

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <div
            className={`routePage${
              isSidebarOpen ? " routePage--noScroll" : ""
            }`}
          >
            <Sidebar>
              <RouteSidebar />
            </Sidebar>
            <Content>
              <div className="routePage__list">
                <div className="routePage__buttonRow">
                  <button className="btn btn-primary" onClick={createNewRoute}>
                    Add new route
                  </button>
                </div>
                {routeListContent}
              </div>
            </Content>
          </div>
        </Route>
      </Switch>
    </>
  );
}
