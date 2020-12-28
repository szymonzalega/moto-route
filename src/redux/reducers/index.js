import { combineReducers } from 'redux';
import routes from './routeReducer';
import sidebar from './sidebarReducer';
import gallery from './galleryReducer';
import * as types from "../actions/actionTypes";

const appReducer = combineReducers({
    routes,
    sidebar,
    gallery
})

const rootReducer = (state, action) => {
    if (action.type === types.USER_LOGOUT) {
        state = undefined;
    } 
    return appReducer(state, action);
}

export default rootReducer;