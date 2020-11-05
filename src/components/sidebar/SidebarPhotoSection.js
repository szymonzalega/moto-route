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
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/moto-route-dev.appspot.com/o/koszyk_vw.JPG?alt=media&token=8baab126-b6d9-4e89-bff3-b6bb6fd39446)`,
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
