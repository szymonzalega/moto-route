import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import * as sidebarActions from "../../redux/actions/sidebarActions";
import RouteElementMap from "../routes/RouteElementMap";
import SidebarAddEditMode from "./SidebarAddEditMode";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const [route, setRoute] = useState({});
  const [sidebar, setSidebar] = useState({});

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getRouteDetails = (routeId) => {
      let route = state.routes.filter((route) => route.id === routeId);
      return route[0];
    };
    setSidebar(state.sidebar);
    setRoute(getRouteDetails(state.sidebar.routeId));
  }, [state]);

  const editRoute = () => {
    console.log(`Edit route: ${route.id}`);
  };

  const openGallery = () => {
    console.log(`Open gallery: ${route.id}`);
  };

  return (
    <div className={`sidebar ${sidebar.isOpen && "sidebar--visible"}`}>
      {sidebar.isOpen && sidebar.mode === "details" ? (
        <div>
          <SidebarNav
            title={route.name}
            description={route.description}
            isEditMode={sidebar.mode !== "details"}
          />
          <div className="sidebar__detailsRow">
            <span className="detailsRow__label">Level:&nbsp;</span>
            <span className="detailsRow__value">{route.level}</span>
          </div>
          <div className="sidebar__detailsRow">
            <span className="detailsRow__label">Author:&nbsp;</span>
            <span className="detailsRow__value">{route.userEmail}</span>
          </div>
          <div className="sidebar__detailsRow">
            <span className="detailsRow__label">Length:&nbsp;</span>
            <span className="detailsRow__value">{route.length}km</span>
          </div>
          <div className="sidebar__detailsRow">
            <span className="detailsRow__label">Type:&nbsp;</span>
            <span className="detailsRow__value">{route.routeType}</span>
          </div>
          <div className="sidebar__detailsRow">
            <span className="detailsRow__label">Length:&nbsp;</span>
            <span className="detailsRow__value">{route.length}km</span>
          </div>
          <RouteElementMap url={route.url} />
          <div className="sidebar__photoSection">
            <div
              style={{
                backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIXSzvCbTMX6l-MOJ8tPUMrESJG5IX9w02GQ&usqp=CAU)`,
              }}
              className="photoSection__photo"
            ></div>
            <div
              style={{
                backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF6ZVQtTBYuEpsYIv8znX_99wxpEWKSsInHw&usqp=CAU)`,
              }}
              className="photoSection__photo"
            ></div>
            <div
              style={{
                backgroundImage: `url(https://saic-mdal.github.io/deep-landscape/img/sr/claudio/lr_107.jpg)`,
              }}
              className="photoSection__photo"
            ></div>
            <div
              style={{
                backgroundImage: `url(https://pbs.twimg.com/profile_images/640666088271839233/OTKlt5pC_400x400.jpg)`,
              }}
              className="photoSection__photo"
            ></div>
            <div className="photoSection__button">
              <IconButton
                aria-label="more"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openGallery}
              >
                <NavigateNextIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          <SidebarNav
            title="Create new route"
            isEditMode={sidebar.mode !== "details"}
          />
          <SidebarAddEditMode />
        </>
      )}
    </div>
  );
}
