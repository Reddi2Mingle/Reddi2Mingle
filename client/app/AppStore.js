import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import { updateUsername, addSubreddit } from './actions/potentialActions';

const middleware = applyMiddleware(promise(), thunk, logger());

let store = createStore(reducer, middleware);

// store.dispatch(updateUsername('Christine'));
// store.dispatch(addSubreddit('yomamajokes'));
// store.dispatch(addSubreddit('aww'));

export default store;
