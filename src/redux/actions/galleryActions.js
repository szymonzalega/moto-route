import * as types from "./actionTypes";

export const getSourcesStarted = () => {
  return {
    type: types.GALLERY__FETCH_SOURCES_STARTED,
  };
};

export const getSourcesSucceeded = (sources) => {
  return {
    type: types.GALLERY__FETCH_SOURCES_SUCCEEDED,
    sources,
  };
};

export const getSourcesFailed = (error) => {
  return {
    type: types.GALLERY__FETCH_SOURCES_FAILED,
    error,
  };
};

export const getPhotosStarted = () => {
  return {
    type: types.GALLERY__FETCH_PHOTOS_STARTED,
  };
};

export const getPhotosSucceeded = (photos) => {
  return {
    type: types.GALLERY__FETCH_PHOTOS_SUCCEEDED,
    photos,
  };
};

export const getMorePhotosSucceeded = (photos) => {
  return {
    type: types.GALLERY__FETCH_MORE_PHOTOS_SUCCEEDED,
    photos,
  };
};

export const getPhotosFailed = (error) => {
  return {
    type: types.GALLERY__FETCH_PHOTOS_FAILED,
    error,
  };
};

export const setSelectedPhoto = (photo) => {
  return {
    type: types.GALLERY__SELECT_PHOTO,
    photo,
  };
};

export const uploadNewPhotosStarted = () => {
  return {
    type: types.GALLERY__UPLOAD_NEW_PHOTOS_STARTED,
  };
};

export const uploadNewPhotosSucceeded = (photos) => {
  return {
    type: types.GALLERY__UPLOAD_NEW_PHOTOS_SUCCEEDED,
    photos,
  };
};

export const uploadNewPhotosFailed = (error) => {
  return {
    type: types.GALLERY__UPLOAD_NEW_PHOTOS_FAILED,
    error,
  };
};

export const resetGalleryState = () => {
  return {
    type: types.GALLERY__RESET_STATE,
  };
};

export const fetchSources = (funcToFetchSources, ...args) => async (
  dispatch
) => {
  dispatch(getSourcesStarted());
  try {
    const sources = await funcToFetchSources(...args);
    dispatch(getSourcesSucceeded(sources));
  } catch (err) {
    console.error(err);
    dispatch(getSourcesFailed(err.toString()));
  }
};

export const fetchPhotos = (funcToFetchPhotos, ...args) => async (dispatch) => {
  dispatch(getPhotosStarted());
  try {
    const { photos, newLastVisible } = await funcToFetchPhotos(...args);
    const isFirstFetch = args.length <= 2;

    isFirstFetch
      ? dispatch(getPhotosSucceeded(photos))
      : dispatch(getMorePhotosSucceeded(photos));

    return newLastVisible;
  } catch (err) {
    console.error(err);
    dispatch(getPhotosFailed(err.toString()));
  }
};

export const selectPhoto = (selectedPhoto, direction) => (
  dispatch,
  getState
) => {
  const { gallery } = getState();

  if (!selectedPhoto && direction === undefined) {
    dispatch(setSelectedPhoto({}));
    return;
  }

  const isFirstPhoto = (selectedIndex) => selectedIndex === 0;
  const isLastPhoto = (selectedIndex) =>
    selectedIndex === gallery.photos.length - 1;

  const selectByClick = () => {
    const selectedIndex = gallery.photos.findIndex(
      (photo) => photo.id === selectedPhoto.id
    );
    dispatch(
      setSelectedPhoto({
        ...selectedPhoto,
        isFirst: isFirstPhoto(selectedIndex),
        isLast: isLastPhoto(selectedIndex),
      })
    );
  };

  const selectByNav = () => {
    const selectedIndex = gallery.photos.findIndex(
      (photo) => photo.id === gallery.selectedPhoto.id
    );
    const newSelectedIndex = selectedIndex + direction;
    dispatch(
      setSelectedPhoto({
        ...gallery.photos[newSelectedIndex],
        isFirst: isFirstPhoto(newSelectedIndex),
        isLast: isLastPhoto(newSelectedIndex),
      })
    );
  };

  if (direction !== undefined) {
    selectByNav();
  } else {
    selectByClick();
  }
};

export const uploadPhotos = (funcToUploadPhotos, ...args) => async (
  dispatch
) => {
  dispatch(uploadNewPhotosStarted());
  try {
    const result = await funcToUploadPhotos(...args);
    dispatch(uploadNewPhotosSucceeded(result));
  } catch (err) {
    console.error(err);
    dispatch(uploadNewPhotosFailed(err.toString()));
  }
};
