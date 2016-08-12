import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { updateUsername, addSubreddit } from './potential/PotentialActions';
import potential from './potential/PotentialReducer';
import user from './user/UserReducer';

const middleware = applyMiddleware(promise(), thunk, logger());

const reducer = combineReducers({
  potential,
  user,
});

export default createStore(reducer, middleware);

// store.dispatch(updateUsername('Christine'));
// store.dispatch(addSubreddit('yomamajokes'));
// store.dispatch(addSubreddit('aww'));

// export default store;
