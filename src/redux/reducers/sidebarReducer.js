import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function sidebarReducers(state = initialState.sidebar, action) {
  switch (action.type) {
    case types.SIDEBAR_OPEN:
      return action.sidebar;
    case types.SIDEBAR_CLOSE:
      return {isOpen: false};
    default:
      return state;
  }
}
