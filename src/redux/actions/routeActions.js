import * as types from "./actionTypes";

export function loadRoutesSuccess(routes) {
    return {
        type: types.LOAD_ROUTES_SUCCESS,
        routes,
    };
}

export function loadRoutes() {
    return function (dispatch) {
        const routes = [
            {
                name: "Tatry",
                url: "https://tatry.com"
            },{
                name: "Ojcow",
                url: "https://ojcow.com"
            },{
                name: "Limanowa",
                url: "https://limanowa.com"
            },
        ]
        dispatch(loadRoutesSuccess(routes));
    }
}