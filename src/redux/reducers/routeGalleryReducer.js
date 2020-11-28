import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function routeGalleryReducer(
  state = initialState.routeGallery,
  action
) {
  switch (action.type) {
    case types.ROUTE_GALLERY__FETCH_STARTED:
      return { ...state, status: "pending" };
    case types.ROUTE_GALLERY__FETCH_SUCCEEDED:
      return { ...state, status: "succeeded", photos: action.photos };
    case types.ROUTE_GALLERY__FETCH_FAILED:
      return { ...state, status: "failed", error: action.error };
    case types.ROUTE_GALLERY__SELECT_PHOTO:
      return { ...state, selectedPhoto: action.photo };
    case types.ROUTE_GALLERY_UPLOAD_NEW_PHOTOS:
      return { ...state, photos: [...action.photos, ...state.photos] };
    default:
      return state;
  }
}
