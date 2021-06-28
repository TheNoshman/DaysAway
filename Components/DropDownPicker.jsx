import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import changeSelectedTrainStationAction from '../actionCreators/changeSelectedTrainStationAction';
import addTimetableToCacheAction from '../actionCreators/addTimetableToCacheAction';
import updateTimetableCacheAction from '../actionCreators/updateTimetableCacheAction';

// SERVICE API FUNCTIONS
import { getStationTimetable } from '../serviceAPI';
import { getCachedTimetable } from '../serviceFunctions';

// STATION PICKER SELECT
import RNPickerSelect from 'react-native-picker-select';

export default function DropDownPicker() {
  const [noDepartures, setNoDepartures] = useState(false);
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
      if (timetable) {
        dispatch(addTimetableToCacheAction(timetable));
        setNoDepartures(false);
      } else {
        setNoDepartures(true);
      }
    }
  };

  return (
    <View style={styles.textBox}>
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
            return <Ionicons name="md-arrow-down" size={24} color="#00dbdb" />;
          } else {
            return <Ionicons name="md-arrow-down" size={24} color="#ffb01f" />;
          }
        }}
        items={reduxStationList}
      />
      {noDepartures ? (
        <Text>No departures from selected station, please choose another</Text>
      ) : null}
    </View>
  );
}
// ################## STYLES ##################
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    height: 70,
    alignItems: 'center',
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
