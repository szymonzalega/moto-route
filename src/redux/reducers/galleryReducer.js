import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function galleryReducer(state = initialState.gallery, action) {
  switch (action.type) {
    case types.GALLERY__FETCH_SOURCES_STARTED:
      return { ...state, sourcesStatus: "pending" };
    case types.GALLERY__FETCH_SOURCES_SUCCEEDED:
      return {
        ...state,
        sourcesStatus: "succeeded",
        sources: [...state.sources, ...action.sources],
      };
    case types.GALLERY__FETCH_SOURCES_FAILED:
      return { ...state, sourcesStatus: "failed", error: action.error };
    case types.GALLERY__FETCH_PHOTOS_STARTED:
      return { ...state, status: "pending" };
    case types.GALLERY__FETCH_PHOTOS_SUCCEEDED:
      return {
        ...state,
        status: "succeeded",
        photos: [...action.photos],
      };
    case types.GALLERY__FETCH_MORE_PHOTOS_SUCCEEDED:
      return {
        ...state,
        status: "succeeded",
        photos: [...state.photos, ...action.photos],
      };
    case types.GALLERY__FETCH_PHOTOS_FAILED:
      return { ...state, status: "failed", error: action.error };
    case types.GALLERY__SELECT_PHOTO:
      return { ...state, selectedPhoto: action.photo };
    case types.GALLERY__UPLOAD_NEW_PHOTOS_STARTED:
      return { ...state, uploadStatus: "pending" };
    case types.GALLERY__UPLOAD_NEW_PHOTOS_SUCCEEDED:
      return {
        ...state,
        uploadStatus: "succeeded",
        photos: [...action.photos, ...state.photos],
      };
    case types.GALLERY__UPLOAD_NEW_PHOTOS_FAILED:
      return { ...state, uploadStatus: "failed", error: action.error };
    case types.GALLERY__RESET_STATE:
      return initialState.gallery;
    default:
      return state;
  }
}
