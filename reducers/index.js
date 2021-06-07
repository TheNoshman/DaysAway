import { combineReducers } from 'redux';
import trainStationListReducer from './trainStationListReducer';
import userLocationReducer from './userLocationReducer';

export default combineReducers({
  reduxUserLocation: userLocationReducer,
  reduxTrainStationList: trainStationListReducer,
});
