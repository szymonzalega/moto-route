import * as types from "./actionTypes";
import { db } from "../../firebase";

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

export function loadUserRoutes(userId) {
  return async function (dispatch) {
    let routes = [];
    try {
      const routesRef = await db
        .collection("routes")
        .where("userId", "==", userId)
        .get();
      routesRef.forEach((doc) => {
        routes.push({ ...doc.data(), id: doc.id });
      });
      dispatch(loadUserRoutesSuccess(routes));
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

export function saveRoute(route, { uid, email }) {
  return async function (dispatch) {
    try {
      route = { ...route, userId: uid, userEmail: email };
      if (route.id !== undefined) {
        await db.collection("routes").doc(route.id).set(route);
        dispatch(updateRouteSuccess(route));
      } else {
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
