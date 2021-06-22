import { combineReducers } from 'redux';
import selectedTrainStationReducer from './selectedTrainStationReducer';
import trainStationListReducer from './trainStationListReducer';
import userLocationReducer from './userLocationReducer';
import timetableReducer from './timetableReducer';
import userTravelTimeReducer from './userTravelTimeReducer';
import seenDestinationReducer from './seenDestinationReducer';

export default combineReducers({
  reduxUserLocation: userLocationReducer,
  reduxTrainStationList: trainStationListReducer,
  reduxSelectedTrainStation: selectedTrainStationReducer,
  reduxTimetableCache: timetableReducer,
  reduxUserTravelTime: userTravelTimeReducer,
  reduxSeenDestinationCache: seenDestinationReducer,
});
