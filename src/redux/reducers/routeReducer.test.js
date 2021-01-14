import reducer from "./routeReducer";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

describe("route reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      routes: [],
      fetchStatus: "idle",
      saveStatus: "idle",
      removeStatus: "idle",
      fetchPhotosStatus: "idle",
      error: null,
    });
  });

  it("should handle ROUTE__FETCH_STARTED", () => {
    expect(
      reducer(initialState.routes, {
        type: types.ROUTE__FETCH_STARTED,
      })
    ).toEqual({
      routes: [],
      fetchStatus: "pending",
      saveStatus: "idle",
      removeStatus: "idle",
      fetchPhotosStatus: "idle",
      error: null,
    });
  });

  it("should handle ROUTE__FETCH_SUCCEEDED", () => {
    const routes = [
      { id: 1, name: "foo" },
      { id: 2, name: "bar" },
    ];

    expect(
      reducer(initialState.routes, {
        type: types.ROUTE__FETCH_SUCCEEDED,
        routes,
      })
    ).toEqual({
      routes: [
        { id: 1, name: "foo" },
        { id: 2, name: "bar" },
      ],
      fetchStatus: "succeeded",
      saveStatus: "idle",
      removeStatus: "idle",
      fetchPhotosStatus: "idle",
      error: null,
    });
  });

  it("should handle ROUTE__FETCH_FAILED", () => {
    const error = "Error fetch route";

    expect(
      reducer(initialState.routes, {
        type: types.ROUTE__FETCH_FAILED,
        error,
      })
    ).toEqual({
      routes: [],
      fetchStatus: "failed",
      saveStatus: "idle",
      removeStatus: "idle",
      fetchPhotosStatus: "idle",
      error,
    });
  });

  it("should handle ROUTE__SAVE_UPDATE_SUCCEEDED", () => {
    const state = {
      ...initialState.routes,
      routes: [
        { id: 1, name: "foo" },
        { id: 2, name: "bar" },
      ],
    };

    const route = {
      id: 1,
      name: "updated",
    };

    expect(
      reducer(state, {
        type: types.ROUTE__SAVE_UPDATE_SUCCEEDED,
        route,
      })
    ).toEqual({
      routes: [
        { id: 1, name: "updated" },
        { id: 2, name: "bar" },
      ],
      fetchStatus: "idle",
      saveStatus: "succeeded",
      removeStatus: "idle",
      fetchPhotosStatus: "idle",
      error: null,
    });
  });
});
