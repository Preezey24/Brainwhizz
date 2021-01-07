import { createStore, applyMiddleware, combineReducers, compose } from 'redux'; 
import thunk from 'redux-thunk';  

import sessionReducer from './reducers/session'

//combine all reducers 
const rootReducer = combineReducers({
    session: sessionReducer, 
}); 

//to view Redux store in the browser 
let enhancer; 
if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default; 
    const composeEnhancers = 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
    enhancer = composeEnhancers(applyMiddleware(thunk, logger)); 
}

const configureStore = (preloadedState = {}) => {
    return createStore(
        rootReducer, 
        preloadedState, 
        enhancer, 
    );
};

export default configureStore; 