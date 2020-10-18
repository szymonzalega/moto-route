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
        route
    }
}

export function loadUserRoutes(userId) {
  return async function (dispatch) {
    let routes = [];
    const routesRef = await db
      .collection("routes")
      .where("userId", "==", userId)
      .get();
    routesRef.forEach((doc) => {
      routes.push({ ...doc.data(), id: doc.id });
    });
    dispatch(loadUserRoutesSuccess(routes));
  };
}

export function saveRoute(route) {
    return async function(dispatch) {
        const routesRef = await db.collection("routes").add(route)
        console.log(`doc ID! : ${routesRef.id}`)
        dispatch(createRouteSuccess(route))
    }
}
