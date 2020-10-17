import * as types from "./actionTypes";
import { db } from "../../firebase";


export function loadUserRoutesSuccess(routes) {
  return {
    type: types.LOAD_ROUTES_SUCCESS,
    routes,
  };
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
