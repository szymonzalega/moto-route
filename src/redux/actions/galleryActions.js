import * as types from "./actionTypes";

export function selectPhoto(photo) {
  return {
    type: types.SELECT_PHOTO,
    photo,
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