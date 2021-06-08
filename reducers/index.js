import { combineReducers } from 'redux';
import selectedTrainStationReducer from './selectedTrainStationReducer';
import trainStationListReducer from './trainStationListReducer';
import userLocationReducer from './userLocationReducer';

export default combineReducers({
  reduxUserLocation: userLocationReducer,
  reduxTrainStationList: trainStationListReducer,
  reduxSelectedTrainStation: selectedTrainStationReducer,
});
