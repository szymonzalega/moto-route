import React, { useState, useEffect } from "react";
import "./PhotoPreview.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useDispatch, useSelector } from "react-redux";
// import { selectPhoto } from "../../redux/actions/galleryActions";
import { selectPhoto } from "../../redux/actions/routeGalleryActions";

export default function PhotoPreview() {
  const selectedPhoto = useSelector(state => state.routeGallery.selectedPhoto);
  const dispatch = useDispatch();

  const photoNavigation = {
    NEXT: 1,
    PREV: -1,
  };

  function selectOtherPhoto(direction) {
    dispatch(selectPhoto(null, direction))
  }

  const isFirstPhoto = selectedPhoto.isFirst;
  const isLastPhoto = selectedPhoto.isLast;

  return (
    <div className="gallery">
      <div className="gallery__bigPhoto">
        {selectedPhoto ? (
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
      </div>
    </div>
  );
}
