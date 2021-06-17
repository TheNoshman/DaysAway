import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import changeSelectedTrainStationAction from '../actionCreators/changeSelectedTrainStationAction';
import addTimetableToCacheAction from '../actionCreators/addTimetableToCacheAction';
import updateTimetableCacheAction from '../actionCreators/updateTimetableCacheAction';

// SERVICE API FUNCTIONS
import { getCachedTimetable, getStationTimetable } from '../serviceAPI';

// STATION PICKER SELECT
import RNPickerSelect from 'react-native-picker-select';

export default function DropDownPicker() {
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxTimetables = useSelector((state) => state.reduxTimetableCache);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const dispatch = useDispatch();

  const handleValueChange = async (value) => {
    if (value === null || value.code === reduxSelectedStation.code) {
      return;
    }
    const { payload } = dispatch(changeSelectedTrainStationAction(value));
    const cachedTimetable = getCachedTimetable(reduxTimetables, value.code);
    if (cachedTimetable.length) {
      console.log('cached has length ');
      dispatch(updateTimetableCacheAction(cachedTimetable));
    } else {
      const timetable = await getStationTimetable(payload.code);
      dispatch(addTimetableToCacheAction(timetable));
    }
  };

  return (
    <RNPickerSelect
      style={{
        ...styles,
        iconContainer: {
          top: 18,
          right: 18,
        },
      }}
      onValueChange={(value) => handleValueChange(value)}
      disabled={reduxStationList.length > 1 ? false : true}
      useNativeAndroidPickerStyle={false}
      placeholder={{ label: 'Select a station...', value: null }}
      value={reduxSelectedStation}
      Icon={() => {
        if (reduxStationList.length > 1) {
          return <Ionicons name="md-arrow-down" size={24} color="red" />;
        } else {
          return <Ionicons name="md-arrow-down" size={24} color="gray" />;
        }
      }}
      items={reduxStationList}
    />
  );
}
// ################## STYLES ##################
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    width: 150,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputAndroid: {
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
