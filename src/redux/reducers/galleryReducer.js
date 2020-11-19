import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function galleryReducer(state = initialState.gallery, action) {
  switch (action.type) {
    case types.SELECT_PHOTO:
      return {...state, selectedPhoto: action.photo}
    case types.GET_NEXT_PHOTO:
      return action.gallery;
    case types.GET_PREV_PHOTO:
      return action.gallery;
    default:
      return state;
  }
}
