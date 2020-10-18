import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function routeReducers(state = initialState.routes, action) {
  switch (action.type) {
    case types.LOAD_ROUTES_SUCCESS:
      return action.routes;
    case types.CREATE_ROUTE_SUCCESS:
      return [...state, { ...action.route }];
    case types.UPDATE_ROUTE_SUCCESS:
      return state.map((route) =>
        route.id === action.route.id ? action.route : route
      );
    default:
      return state;
  }
}
