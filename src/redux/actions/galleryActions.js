import * as types from "./actionTypes";
import {getPhotosByRouteId} from "./routeActions"

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

export function resetGalleryState() {
  return {
    type: types.RESET_GALLERY_STATE
  };
}

export function loadRoutePhotos(routeId) {
    return async function (dispatch) {
      try {
        const photos = await getPhotosByRouteId(routeId, 20);
        dispatch(loadPhotos(photos));
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
  }

  export function selectNextPhoto() {
    return function (dispatch) {
      
    };
  }