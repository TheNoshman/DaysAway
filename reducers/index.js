import { combineReducers } from 'redux';
import userLocationReducer from './userLocationReducer';

export default combineReducers({
  reduxUserLocation: userLocationReducer,
});
