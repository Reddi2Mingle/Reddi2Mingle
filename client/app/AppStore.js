import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import potentials from './potential/PotentialReducer';
import user from './user/UserReducer';

const middleware = applyMiddleware(promise(), thunk, logger());

const reducer = combineReducers({
  potentials,
  user,
});

export default createStore(reducer, middleware);
