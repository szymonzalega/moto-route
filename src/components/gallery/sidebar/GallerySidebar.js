import React from "react";
import "./GallerySidebar.css";
import SidebarUploadPhoto from "./uploadPhoto/SidebarUploadPhoto";
import SidebarPhotoList from "./photoList/SidebarPhotoList";

export default function GallerySidebar({ onSubmit, getMorePhotos, isMorePhotosAvailable }) {

  return (
    <>
      <SidebarUploadPhoto onSubmit={onSubmit} />
      <SidebarPhotoList getMorePhotos={getMorePhotos} isMorePhotosAvailable={isMorePhotosAvailable}/>
    </>
  );
}
