import { combineReducers } from 'redux';
import potential from './potentialReducer';
import user from './userReducer';

export default combineReducers({
  potential,
  user,
});
