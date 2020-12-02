import { combineReducers } from 'redux';
import routes from './routeReducer';
import sidebar from './sidebarReducer';
import routeGallery from './galleryReducer';
import * as types from "../actions/actionTypes";

const appReducer = combineReducers({
    routes,
    sidebar,
    routeGallery
})

const rootReducer = (state, action) => {
    if (action.type === types.USER_LOGOUT) {
        state = undefined;
    } 
    return appReducer(state, action);
}

export default rootReducer;