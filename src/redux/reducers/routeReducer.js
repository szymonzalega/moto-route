import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function routeReducers(state = initialState.routes, action) {
  switch (action.type) {
    case types.ROUTE__FETCH_STARTED:
      return { ...state, status: "pending" };
    case types.ROUTE__FETCH_SUCCEEDED:
      return {
        ...state,
        routes: [...state.routes, ...action.routes],
        status: "succeeded",
      };
    case types.ROUTE__FETCH_FAILED:
      return { ...state, error: action.error, status: "failed" };
    case types.CREATE_ROUTE_SUCCESS:
      return [...state, { ...action.route }];
    case types.UPDATE_ROUTE_SUCCESS:
      return state.map((route) =>
        route.id === action.route.id ? action.route : route
      );
    case types.DELETE_ROUTE_SUCCESS:
      return state.filter((route) => route.id !== action.route.id);
    default:
      return state;
  }
}
