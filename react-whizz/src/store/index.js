import { createStore, applyMiddleware, combineReducers } from 'redux'; 
import thunk from 'redux-thunk'; 
import logger from 'redux-logger'; 

import session from './reducers/session'

//combine all reducers 
const rootReducer = combineReducers({
    session, 
}); 

const configureStore = (preloadedState = {}) => {
    return createStore(
        rootReducer, 
        preloadedState, 
        applyMiddleware(thunk, logger), 
    );
};

export default configureStore; 