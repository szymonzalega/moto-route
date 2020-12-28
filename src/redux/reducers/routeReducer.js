import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function routeReducers(state = initialState.routes, action) {
  switch (action.type) {
    case types.ROUTE__FETCH_STARTED:
      return { ...state, fetchStatus: "pending" };
    case types.ROUTE__FETCH_SUCCEEDED:
      return {
        ...state,
        routes: [...state.routes, ...action.routes],
        fetchStatus: "succeeded",
      };
    case types.ROUTE__FETCH_FAILED:
      return { ...state, error: action.error, fetchStatus: "failed" };
    case types.ROUTE__SAVE_STARTED:
      return { ...state, saveStatus: "pending" };
    case types.ROUTE__SAVE_CREATE_SUCCEEDED:
      return {
        ...state,
        routes: [...state.routes, action.route],
        saveStatus: "succeeded",
      };
    case types.ROUTE__SAVE_UPDATE_SUCCEEDED:
      return {
        ...state,
        routes: state.routes.map((route) =>
          route.id === action.route.id ? action.route : route
        ),
        saveStatus: "succeeded",
      };
    case types.ROUTE__SAVE_FAILED:
      return { ...state, error: action.error, saveStatus: "failed" };
    case types.ROUTE__SAVE_ENDED:
      return { ...state, saveStatus: "idle" };
    case types.ROUTE__REMOVE_STARTED:
      return { ...state, removeStatus: "pending" };
    case types.ROUTE__REMOVE_SUCCEEDED:
      let x = {
        ...state,
        routes: state.routes.filter((route) => route.id !== action.route.id),
        removeStatus: "succeeded",
      };
      return x;
    case types.ROUTE__REMOVE_FAILED:
      return { ...state, error: action.error, removeStatus: "failed" };
    case types.ROUTE__REMOVE_ENDED:
      return { ...state, removeStatus: "idle" };
    case types.ROUTE__FETCH_PHOTOS_STARTED:
      return { ...state, fetchPhotosStatus: "pending" };
    case types.ROUTE__FETCH_PHOTOS_SUCCEEDED:
      return {
        ...state,
        routes: state.routes.map((route) =>
          route.id === action.result.routeId
            ? { ...route, photos: action.result.photos }
            : route
        ),
        fetchPhotosStatus: "succeeded",
      };
    case types.ROUTE__FETCH_PHOTOS_FAILED:
      return { ...state, error: action.error, fetchPhotosStatus: "failed" };
    default:
      return state;
  }
}
