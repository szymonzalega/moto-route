import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function galleryReducer(state = initialState.gallery, action) {
  switch (action.type) {
    case types.LOAD_PHOTOS:
      return { ...state, photos: action.photos };
    case types.SELECT_PHOTO:
      return { ...state, selectedPhoto: action.photo };
    case types.RESET_GALLERY_STATE:
      return initialState.gallery
    default:
      return state;
  }
}
