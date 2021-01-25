import React from "react";
import "./GallerySidebar.scss";
import SidebarSelectSource from "./selectSource/SidebarSelectSource";
import SidebarUploadPhoto from "./uploadPhoto/SidebarUploadPhoto";
import SidebarPhotoList from "./photoList/SidebarPhotoList";

export default function GallerySidebar({
  onSourceSelect,
  onUpload,
  getMorePhotos,
  isMorePhotosAvailable,
}) {
  return (
    <>
      <SidebarSelectSource onSelect={onSourceSelect}></SidebarSelectSource>
      <SidebarUploadPhoto onSubmit={onUpload} />
      <SidebarPhotoList
        getMorePhotos={getMorePhotos}
        isMorePhotosAvailable={isMorePhotosAvailable}
      />
    </>
  );
}
