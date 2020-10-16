import { combineReducers } from 'redux';
import route from './routeReducer';
// import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    route,
    // apiCallsInProgress
})

export default rootReducer;