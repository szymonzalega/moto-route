import React, { useState, useEffect } from "react";
import "./PhotoPreview.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../redux/actions/galleryActions";

export default function PhotoPreview() {
  const [selectedImg, setSelectedImg] = useState(null);
  const gallery = useSelector(({ gallery }) => gallery);
  const dispatch = useDispatch();

  const photoNavigation = {
    NEXT: 1,
    PREV: -1,
  };

  useEffect(() => {
    if (gallery.selectedPhoto) {
      setSelectedImg(gallery.selectedPhoto);
    }
  }, [gallery]);

  function selectOtherPhoto(direction) {
    const currentSelectedPhotoIndex = gallery.selectedPhoto.index;
    const nextPhoto = gallery.photos[currentSelectedPhotoIndex + direction];
    const photoObj = {
      ...nextPhoto,
      index: currentSelectedPhotoIndex + direction,
    };
    dispatch(selectPhoto(photoObj));
  }

  const isFirstPhoto =
    gallery && gallery.selectedPhoto && gallery.selectedPhoto.index === 0;
  const isLastPhoto =
    gallery &&
    gallery.selectedPhoto &&
    gallery.selectedPhoto.index === gallery.photos.length - 1;

  return (
    <div className="gallery">
      <div className="gallery__bigPhoto">
        {selectedImg ? (
          <>
            {!isFirstPhoto && (
              <IconButton
                aria-label="more"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => selectOtherPhoto(photoNavigation.PREV)}
              >
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
              </IconButton>
            )}

            <div
              className="bigPhoto__photo"
              style={{ backgroundImage: `url(${selectedImg.photoUrl})` }}
            ></div>

            {!isLastPhoto && (
              <IconButton
                aria-label="more"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => selectOtherPhoto(photoNavigation.NEXT)}
              >
                <NavigateNextIcon style={{ fontSize: 50 }} />
              </IconButton>
            )}
          </>
        ) : (
          <span className="gallery__emptyInfo">
            Gallery is empty. Upload new photos :)
          </span>
        )}
      </div>
    </div>
  );
}
