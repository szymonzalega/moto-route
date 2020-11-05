import React, {useState} from "react";
import "./SidebarPhotoSection.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export default function SidebarPhotoSection({ photos }) {

  const openGallery = () => {
    // console.log(`Open gallery: ${route.id}`);
  };

  const getFewPhotos = (photos, amount) => {
    if (photos.length > amount) {
        return photos.slice(0,amount);
    }
    return photos;
  }

  return (
    <div className="sidebar__photoSection">
      {getFewPhotos(photos, 4).map((photo) => (
        <div
          style={{
            backgroundImage: `url(${photo})`,
          }}
          className="photoSection__photo"
        ></div>
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
  );
}
