import { combineReducers } from 'redux';
import selectedTrainStationReducer from './selectedTrainStationReducer';
import trainStationListReducer from './trainStationListReducer';
import userLocationReducer from './userLocationReducer';
import timetableReducer from './timetableReducer';

export default combineReducers({
  reduxUserLocation: userLocationReducer,
  reduxTrainStationList: trainStationListReducer,
  reduxSelectedTrainStation: selectedTrainStationReducer,
  reduxTimetableCache: timetableReducer,
});
