import React from "react";
import "./PhotoPreview.scss";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../../redux/actions/galleryActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function PhotoPreview() {
  const selectedPhoto = useSelector((state) => state.gallery.selectedPhoto);
  const fetchStatus = useSelector((state) => state.gallery.status);
  const dispatch = useDispatch();

  const photoNavigation = {
    NEXT: 1,
    PREV: -1,
  };

  function selectOtherPhoto(direction) {
    dispatch(selectPhoto(null, direction));
  }

  const isFirstPhoto = selectedPhoto.isFirst;
  const isLastPhoto = selectedPhoto.isLast;

  let previewContent;

  if (fetchStatus === "pending") {
    previewContent = (
        <CircularProgress />
    );
  } else if (fetchStatus === "failed") {
    previewContent = (
      <div className="gallery__error">Error while showing photo</div>
    );
  } else if (fetchStatus === "succeeded") {
    previewContent = (
      <>
        {selectedPhoto.id ? (
          <>
            <IconButton
              style={{ visibility: `${isFirstPhoto ? "hidden" : "visible"}` }}
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => selectOtherPhoto(photoNavigation.PREV)}
            >
              <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </IconButton>

            <div
              className="bigPhoto__photo"
              style={{ backgroundImage: `url(${selectedPhoto.photoUrl})` }}
            ></div>

            <IconButton
              style={{ visibility: `${isLastPhoto ? "hidden" : "visible"}` }}
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => selectOtherPhoto(photoNavigation.NEXT)}
            >
              <NavigateNextIcon style={{ fontSize: 50 }} />
            </IconButton>
          </>
        ) : (
          <span className="gallery__emptyInfo">
            Gallery is empty. Upload new photos :)
          </span>
        )}
      </>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery__bigPhoto">{previewContent}</div>
    </div>
  );
}
