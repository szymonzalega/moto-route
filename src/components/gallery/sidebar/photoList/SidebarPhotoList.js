import React, { useEffect } from "react";
import "./SidebarPhotoList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../../../redux/actions/routeGalleryActions";

export default function SidebarPhotoList({getMorePhotos}) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.routeGallery.photos);
  const selectedPhoto = useSelector(
    (state) => state.routeGallery.selectedPhoto
  );

  useEffect(() => {
    const hasPhotos = photos && photos.length > 0;
    const isSelectedPhoto = selectedPhoto.id;
    if (hasPhotos && !isSelectedPhoto) {
      selectImage(photos[0]);
    }
  }, [photos]);

  const selectImage = (photo) => {
    dispatch(selectPhoto(photo));
  };

  return (
    <div className="sidebarPhotoList">
      {photos.map((photo) => (
        <div
          key={photo.id}
          onClick={() => selectImage(photo)}
          className={`sidebarPhotoList__photo ${
            selectedPhoto.id === photo.id && "sidebarPhotoList__photo--selected"
          }`}
          style={{
            backgroundImage: `url(${photo.photoUrl})`,
          }}
          alt={photo.photoUrl}
          src={photo.photoUrl}
        />
      ))}
      <button onClick={getMorePhotos}>Load more</button>
    </div>
  );
}
