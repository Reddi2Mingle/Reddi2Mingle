import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import { updateUsername, addSubreddit } from './potential/PotentialActions';
import potentialReducer from './potential/PotentialReducer';
import userReducer from './user/UserReducer';

const middleware = applyMiddleware(promise(), thunk, logger());

const reducer = combineReducers({
  potentialReducer,
  userReducer,
});

let store = createStore(reducer, middleware);

// store.dispatch(updateUsername('Christine'));
// store.dispatch(addSubreddit('yomamajokes'));
// store.dispatch(addSubreddit('aww'));

export default store;
