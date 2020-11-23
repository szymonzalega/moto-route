import React from "react";
import "./GallerySidebar.css";
import SidebarUploadPhoto from "./sidebar/uploadPhoto/SidebarUploadPhoto";
import SidebarPhotoList from "./sidebar/photoList/SidebarPhotoList";

export default function GallerySidebar({ onSubmit }) {

  return (
    <>
      <SidebarUploadPhoto onSubmit={onSubmit} />
      <SidebarPhotoList />
    </>
  );
}
