import { combineReducers } from 'redux';
import routes from './routeReducer';
import * as types from "../actions/actionTypes";

const appReducer = combineReducers({
    routes,
    // apiCallsInProgress
})

const rootReducer = (state, action) => {
    if (action.type === types.USER_LOGOUT) {
        state = undefined;
    } 
    return appReducer(state, action);
}

export default rootReducer;