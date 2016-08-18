import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import potentials from './potential/PotentialReducer';
import user from './user/UserReducer';
import matches from './matches/MatchesReducer';

const middleware = applyMiddleware(promise(), thunk, logger());

const reducer = combineReducers({
  potentials,
  user,
  matches,
});

export default createStore(
  reducer,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
