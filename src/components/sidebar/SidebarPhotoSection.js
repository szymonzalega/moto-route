import React, { useState, useEffect } from "react";
import "./SidebarPhotoSection.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import { getPhotosByRouteId } from "../../redux/actions/routeActions";

export default function SidebarPhotoSection({ routeId }) {
  const [galleryPreview, setGalleryPreview] = useState([]);
  const history = useHistory();

  const openGallery = () => {
    history.push(`/index/gallery/${routeId}`);
  };

  useEffect(() => {
    (async () => {
      if (routeId) {
        setGalleryPreview(await getPhotosByRouteId(routeId, 4));
      }
    })();
  }, [routeId]);

  return (
    <div className="sidebar__photoSection">
      {galleryPreview.length === 0 ? (
        <div className="photoSection__emptyGallery">
          <button className="btn btn-primary" onClick={openGallery}>
            Add new photo
          </button>
        </div>
      ) : (
        <div className="photoSection__photos">
          {galleryPreview.map(({photoUrl}, index) => (
            <img
              key={photoUrl}
              alt={index}
              src={photoUrl}
              className="photoSection__photo"
            />
          ))}
          <div className="photoSection__button">
            {/* <Tooltip title="Go to gallery"> */}
            <IconButton
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={openGallery}
            >
              <NavigateNextIcon />
            </IconButton>
            {/* </Tooltip> */}
          </div>
        </div>
      )}
    </div>
  );
}
