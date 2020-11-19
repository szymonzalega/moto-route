import * as types from "./actionTypes";

export function selectPhoto(gallery) {
  return {
    type: types.SELECT_PHOTO,
    gallery,
  };
}

export function getNextPhoto() {
  return {
    type: types.GET_NEXT_PHOTO
  };
}

export function getPrevPhoto() {
  return {
    type: types.GET_PREV_PHOTO
  };
}