import * as types from "./actionTypes";
import {
  getRoutesByUserId,
  getRoutePhotosByRouteId,
  removeRouteById,
  createRoute,
  updateRoute,
} from "../../services/routeAPI";

export const getRoutesStarted = () => {
  return {
    type: types.ROUTE__FETCH_STARTED,
  };
};

export const getRoutesSucceeded = (routes) => {
  return {
    type: types.ROUTE__FETCH_SUCCEEDED,
    routes,
  };
};

export const getRoutesFailed = (error) => {
  return {
    type: types.ROUTE__FETCH_FAILED,
    error,
  };
};

export const saveRouteStarted = () => {
  return {
    type: types.ROUTE__SAVE_STARTED,
  };
};

export const createRouteSucceeded = (route) => {
  return {
    type: types.ROUTE__SAVE_CREATE_SUCCEEDED,
    route,
  };
};

export const updateRouteSucceeded = (route) => {
  return {
    type: types.ROUTE__SAVE_UPDATE_SUCCEEDED,
    route,
  };
};

export const saveRouteFailed = (error) => {
  return {
    type: types.ROUTE__SAVE_FAILED,
    error,
  };
};

export const saveRouteEnded = () => {
  return {
    type: types.ROUTE__SAVE_ENDED,
  };
};

export function createRouteSuccess(route) {
  return {
    type: types.CREATE_ROUTE_SUCCESS,
    route,
  };
}

export function deleteRouteStarted() {
  return {
    type: types.ROUTE__REMOVE_STARTED,
  };
}

export function deleteRouteSucceeded(route) {
  return {
    type: types.ROUTE__REMOVE_SUCCEEDED,
    route,
  };
}

export function deleteRouteFailed(error) {
  return {
    type: types.ROUTE__REMOVE_FAILED,
    error,
  };
}

export function deleteRouteEnded() {
  return {
    type: types.ROUTE__REMOVE_ENDED,
  };
}

export function getPhotosStarted() {
  return {
    type: types.ROUTE__FETCH_PHOTOS_STARTED,
  };
}

export function getPhotosSucceeded(result) {
  return {
    type: types.ROUTE__FETCH_PHOTOS_SUCCEEDED,
    result,
  };
}

export function getPhotosFailed(error) {
  return {
    type: types.ROUTE__FETCH_PHOTOS_FAILED,
    error,
  };
}

export const fetchRoutes = (userId) => async (dispatch) => {
  dispatch(getRoutesStarted());
  try {
    const routes = await getRoutesByUserId(userId);
    dispatch(getRoutesSucceeded(routes));
  } catch (err) {
    console.error(err);
    dispatch(getRoutesFailed(err));
  }
};

export const saveRoute = (user, route) => async (dispatch) => {
  dispatch(saveRouteStarted());
  try {
    if (route.id !== undefined) {
      await updateRoute(route);
      dispatch(updateRouteSucceeded(route));
    } else {
      const savedRoute = await createRoute(user, route);
      console.log(savedRoute);
      dispatch(createRouteSucceeded(savedRoute));
    }
  } catch (err) {
    console.error(err);
    dispatch(saveRouteFailed(err));
  } finally {
    dispatch(saveRouteEnded());
  }
};

export const deleteRoute = (route) => async (dispatch) => {
  dispatch(deleteRouteStarted());
  try {
    await removeRouteById(route.id);
    dispatch(deleteRouteSucceeded(route));
  } catch (err) {
    console.error(err);
    dispatch(deleteRouteFailed(err));
  } finally {
    dispatch(deleteRouteEnded());
  }
};

export const getPhotosByRouteId = (routeId, limit = 4, lastPhoto) => async (
  dispatch
) => {
  dispatch(getPhotosStarted());
  try {
    const { photos } = await getRoutePhotosByRouteId(routeId, limit, lastPhoto);
    const result = {
      routeId,
      photos,
    };
    dispatch(getPhotosSucceeded(result));
  } catch (err) {
    console.error(err);
    dispatch(getPhotosFailed(err));
  }
};
