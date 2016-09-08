import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import potentials from './potential/PotentialReducer';
import user from './user/UserReducer';
import matches from './matches/MatchesReducer';
import { socketWrapper } from './socket';

const middleware = applyMiddleware(thunk);

const reducer = combineReducers({
  potentials,
  user,
  matches,
});

export const store = createStore(
  reducer,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

socketWrapper(store);
