import { combineReducers } from 'redux';
import dataOneReducer from './dataOne';

export default combineReducers({
  dataOneProperty: dataOneReducer,
});
