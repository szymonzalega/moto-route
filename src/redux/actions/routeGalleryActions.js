import * as types from "./actionTypes";

export const getPhotosStarted = () => {
  return {
    type: types.ROUTE_GALLERY__FETCH_STARTED,
  };
};

export const getPhotosSucceeded = (result) => {
  return {
    type: types.ROUTE_GALLERY__FETCH_SUCCEEDED,
    result,
  };
};

export const getPhotosFailed = (error) => {
  return {
    type: types.ROUTE_GALLERY__FETCH_FAILED,
    error,
  };
};

export const setSelectedPhoto = (photo) => {
  return {
    type: types.ROUTE_GALLERY__SELECT_PHOTO,
    photo,
  };
};

export const uploadNewPhotosStarted = () => {
  return {
    type: types.ROUTE_GALLERY__UPLOAD_NEW_PHOTOS_STARTED
  };
};

export const uploadNewPhotosSucceeded = (photos) => {
  return {
    type: types.ROUTE_GALLERY__UPLOAD_NEW_PHOTOS_SUCCEEDED,
    photos,
  };
};

export const uploadNewPhotosFailed = (error) => {
  return {
    type: types.ROUTE_GALLERY__UPLOAD_NEW_PHOTOS_FAILED,
    error,
  };
};

export const fetchPhotos = (funcToFetchPhotos, ...args) => async (dispatch) => {
  dispatch(getPhotosStarted());
  try {
    const {photos, lastVisible} = await funcToFetchPhotos(...args);
    dispatch(getPhotosSucceeded({photos, lastVisible}));
  } catch (err) {
    console.error(err);
    dispatch(getPhotosFailed(err.toString()));
  }
};

export const selectPhoto = (selectedPhoto, direction) => (
  dispatch,
  getState
) => {
  const { routeGallery } = getState();

  const isFirstPhoto = (selectedIndex) => selectedIndex === 0;
  const isLastPhoto = (selectedIndex) =>
    selectedIndex === routeGallery.photos.length - 1;

  const selectByClick = () => {
    const selectedIndex = routeGallery.photos.findIndex(
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
    const selectedIndex = routeGallery.photos.findIndex(
      (photo) => photo.id === routeGallery.selectedPhoto.id
    );
    const newSelectedIndex = selectedIndex + direction;
    dispatch(
      setSelectedPhoto({
        ...routeGallery.photos[newSelectedIndex],
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
    dispatch(uploadNewPhotosStarted())
  try {
    const result = await funcToUploadPhotos(...args);
    dispatch(uploadNewPhotosSucceeded(result));
  } catch (err) {
    console.error(err);
    dispatch(uploadNewPhotosFailed(err.toString()));
  }
};
