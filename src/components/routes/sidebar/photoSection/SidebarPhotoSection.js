import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SidebarPhotoSection.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useHistory } from "react-router-dom";
import { getPhotosByRouteId } from "../../../../redux/actions/routeActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SidebarPhotoSection() {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes.routes);
  const routeId = useSelector((state) => state.sidebar.routeId);
  const fetchPhotosStatus = useSelector(
    (state) => state.routes.fetchPhotosStatus
  );

  const history = useHistory();
  const [route, setRoute] = useState({});

  useEffect(() => {
    if (routeId) {
      dispatch(getPhotosByRouteId(routeId));
    }
  }, [routeId, dispatch]);

  useEffect(() => {
    const getRouteDetails = (routeId) =>
      routes.find((route) => route.id === routeId);
    if (routeId) {
      setRoute(getRouteDetails(routeId));
    } else {
      setRoute({});
    }
  }, [routeId, routes]);

  const openGallery = () => {
    history.push(`/index/routes/gallery/${routeId}`);
  };

  let routeListContent;

  if (fetchPhotosStatus === "pending") {
    routeListContent = (
      <div className="photoSection__load">
        <CircularProgress />
      </div>
    );
  }
  if (fetchPhotosStatus === "succeeded") {
    let isPhoto = route.photos;

    routeListContent = (
      <>
        {isPhoto &&
          (!route.photos.length ? (
            <div className="photoSection__emptyGallery">
              <button className="btn btn-primary" onClick={openGallery}>
                Add new photo
              </button>
            </div>
          ) : (
            <div className="photoSection__photos">
              {route.photos.map(({ photoUrl }, index) => (
                <img
                  key={photoUrl}
                  alt={index}
                  src={photoUrl}
                  className="photoSection__photo"
                />
              ))}
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
          ))}
      </>
    );
  } else if (fetchPhotosStatus === "failed") {
    routeListContent = (
      <div className="routePage__message--error">
        Error while fetching routes
      </div>
    );
  }

  return <div className="sidebar__photoSection">{routeListContent}</div>;
}
