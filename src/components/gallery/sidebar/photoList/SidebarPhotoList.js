import React, { useEffect } from "react";
import "./SidebarPhotoList.scss";
import { Button } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../../../redux/actions/galleryActions";

export default function SidebarPhotoList({
  getMorePhotos,
  isMorePhotosAvailable,
}) {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.gallery.status);
  const photos = useSelector((state) => state.gallery.photos);
  const selectedPhoto = useSelector((state) => state.gallery.selectedPhoto);

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

  const scrollToBottom = () => {
    const sidebarElement = document.querySelector("#sidebar");
    sidebarElement.scrollTo(0, document.body.scrollHeight);
  };

  const getMoreData = async () => {
    await getMorePhotos();
    scrollToBottom();
  };

  let additionalContent;

  if (fetchStatus === "pending") {
    additionalContent = (
      <div className="sidebarPhotoList__infoSection">
        <CircularProgress />
      </div>
    );
  } else if (fetchStatus === "failed") {
    additionalContent = (
      <div className="sidebarPhotoList__infoSection sidebarPhotoList__infoSection--error">
        Error while showing photos
      </div>
    );
  }

  return (
    <>
      <div className="sidebarPhotoList">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => selectImage(photo)}
            className={`sidebarPhotoList__photo ${
              selectedPhoto.id === photo.id &&
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
      {additionalContent}
      <div className="sidebarPhotoList__loadMoreButton">
        {isMorePhotosAvailable && (
          <Button onClick={getMoreData} className="w-100" type="submit">
            Get more photos
          </Button>
        )}
      </div>
    </>
  );
}
