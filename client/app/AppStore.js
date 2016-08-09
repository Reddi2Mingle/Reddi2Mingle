import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import { updateUsername } from './actions/potentialActions';

const middleware = applyMiddleware(promise(), thunk, logger());

let store = createStore(reducer, middleware);
console.log(store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(updateUsername('Christine'));

export default store;
