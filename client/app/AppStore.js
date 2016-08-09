import { createStore } from 'redux';

const actions = {};

const state = {};

/** Takes in a redux action and modifies the state based upon action
  * Actions are defined previously from stateful component models
  */
const reducer = (prevState = state, action) => {
  if (actions[action.type]) {
    // Creates a new state object from action
    return actions[action.type](prevState, action.data);
  } else {
    console.warn(`Action ${action.type} doesn't exist.`);
    return prevState;
  }
};

/** Creates Store object using reducer function
  * Refer to redux docs for further information
  */
const Store = createStore(reducer);

export default Store;
