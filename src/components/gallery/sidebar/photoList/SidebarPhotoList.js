import React, { useState, useEffect } from "react";
import "./SidebarPhotoList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../../../redux/actions/galleryActions";

export default function SidebarPhotoList() {
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const gallery = useSelector(({ gallery }) => gallery);

  useEffect(() => {
    const hasPhotos = gallery && gallery.photos && gallery.photos.length > 0;
    const isSelectedPhoto = gallery.selectedPhoto;
    if (hasPhotos && !isSelectedPhoto) {
      selectImage(gallery.photos[0], 0);
    }
  }, [gallery.photos]);

  useEffect(() => {
    if (gallery && gallery.photos) {
      setSelectedImage(gallery.selectedPhoto);
    }
  }, [gallery.selectedPhoto]);

  function selectImage(photo, index) {
    const photoObj = { ...photo, index };
    setSelectedImage(photoObj);
    dispatch(selectPhoto(photoObj));
  }

  return (
    <div className="sidebarPhotoList">
      {gallery &&
        gallery.photos &&
        gallery.photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => selectImage(photo, index)}
            className={`sidebarPhotoList__photo ${
              selectedImage.id === photo.id &&
              "sidebarPhotoList__photo--selected"
            }`}
            style={{
              backgroundImage: `url(${photo.photoUrl})`,
            }}
            alt={photo.photoUrl}
            src={photo.photoUrl}
          />
        ))}
    </div>
  );
}
