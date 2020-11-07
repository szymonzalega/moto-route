import React, { useState, useEffect } from "react";
import "./SidebarPhotoSection.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory  } from "react-router-dom";


export default function SidebarPhotoSection({ routeId, photos }) {
  const [galleryPreview, setGalleryPreview] = useState([]);
  const history = useHistory();

  const openGallery = () => {
    history.push(`/index/gallery/${routeId}`);
  };

  useEffect(() => {
    const getFewPhotos = (photos, amount) => {
      if (photos.length > amount) {
        return photos.slice(0, amount);
      }
      return photos;
    };
    setGalleryPreview(getFewPhotos(photos, 4));
  }, [photos]);

  return (
    <div className="sidebar__photoSection">
      {photos.length === 0 ? (
        <div className="photoSection__emptyGallery">
          <button className="btn btn-primary" onClick={openGallery}>
            Add new photo
          </button>
        </div>
      ) : (
        <div className="photoSection__photos">
          {galleryPreview.map((photo, index) => (
            <img key={photo} alt={index} src={photo} className="photoSection__photo" />
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
