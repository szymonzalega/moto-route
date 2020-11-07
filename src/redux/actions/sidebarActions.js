import * as types from "./actionTypes";

export function openSidebar(sidebar) {
  return {
    type: types.SIDEBAR_OPEN,
    sidebar,
  };
}

export function closeSidebar() {
  return {
    type: types.SIDEBAR_CLOSE
  };
}