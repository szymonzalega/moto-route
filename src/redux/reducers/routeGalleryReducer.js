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
      return { ...state, status: "succeeded", photos: [...state.photos, ...action.photos]};
    case types.ROUTE_GALLERY__FETCH_FAILED:
      return { ...state, status: "failed", error: action.error };
    case types.ROUTE_GALLERY__SELECT_PHOTO:
      return { ...state, selectedPhoto: action.photo };
    case types.ROUTE_GALLERY__UPLOAD_NEW_PHOTOS_STARTED:
      return { ...state, uploadStatus: "pending" };
    case types.ROUTE_GALLERY__UPLOAD_NEW_PHOTOS_SUCCEEDED:
      return {
        ...state,
        uploadStatus: "succeeded",
        photos: [...action.photos, ...state.photos],
      };
    case types.ROUTE_GALLERY__UPLOAD_NEW_PHOTOS_FAILED:
      return { ...state, uploadStatus: "failed", error: action.error };
    default:
      return state;
  }
}
