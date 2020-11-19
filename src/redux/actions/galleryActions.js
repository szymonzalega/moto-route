import * as types from "./actionTypes";

export function loadPhotos(photos) {
  return {
    type: types.LOAD_PHOTOS,
    photos,
  };
}

export function selectPhoto(photo) {
  return {
    type: types.SELECT_PHOTO,
    photo,
  };
}

export function setNextPhoto(photo) {
  return {
    type: types.SET_NEXT_PHOTO,
    photo,
  };
}

export function setPrevPhoto(photo) {
  return {
    type: types.SET_PREV_PHOTO,
    photo
  };
}
