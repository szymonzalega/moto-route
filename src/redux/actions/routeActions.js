import * as types from "./actionTypes";
import { db } from "../../firebase";
import {
  getRoutesByUserId,
  getRoutePhotosByRouteId,
  removeRouteById,
  savePhotosInRoute,
} from "../../services/routeAPI";

export function loadUserRoutesSuccess(routes) {
  return {
    type: types.LOAD_ROUTES_SUCCESS,
    routes,
  };
}

export function createRouteSuccess(route) {
  return {
    type: types.CREATE_ROUTE_SUCCESS,
    route,
  };
}

export function updateRouteSuccess(route) {
  return {
    type: types.UPDATE_ROUTE_SUCCESS,
    route,
  };
}

export function deleteRouteSuccess(route) {
  return {
    type: types.DELETE_ROUTE_SUCCESS,
    route,
  };
}

export function loadUserRoutes(userId) {
  return async function (dispatch) {
    try {
      const routes = await getRoutesByUserId(userId);
      dispatch(loadUserRoutesSuccess(routes));
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

export async function savePhotos(routeId, photosToSave) {
  try {
    const result = await savePhotosInRoute(routeId, photosToSave);
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

export async function getPhotosByRouteId(routeId, limit, lastPhoto) {
  try {
    const { photos, newLastVisible } = await getRoutePhotosByRouteId(
      routeId,
      limit,
      lastPhoto
    );
    //dispatch in future
    return { photos, newLastVisible };
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

export function saveRoute(route, user) {
  return async function (dispatch) {
    try {
      if (route.id !== undefined) {
        await db.collection("routes").doc(route.id).set(route);
        dispatch(updateRouteSuccess(route));
        return route.id;
      } else {
        route = { ...route, userId: user.uid, userEmail: user.email };

        // if (route.photos.length > 0)
        //   route.photos = await savePhotos(route.photos);

        const routesRef = await db.collection("routes").add(route);
        dispatch(createRouteSuccess({ ...route, id: routesRef.id }));
        return routesRef.id;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

export function deleteRoute(route) {
  return async function (dispatch) {
    try {
      removeRouteById(route.id);
      dispatch(deleteRouteSuccess(route));
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  };
}