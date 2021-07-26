import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

// DROP DOWN COMPONENT ON WELCOME MODAL/ LOCATION FOR PICKING LOCAL STATION
export default function DropDownPicker() {
  const [noDepartures, setNoDepartures] = useState(false);
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxTimetables = useSelector((state) => state.reduxTimetableCache);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const dispatch = useDispatch();

  // FUNCTION TO HANDLE STATION CHANGE
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
            top: 20,
            right: 20,
          },
        }}
        onValueChange={(value) => handleValueChange(value)}
        disabled={reduxStationList.length > 1 ? false : true}
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        value={reduxSelectedStation}
        Icon={() => {
          return <Icon name="expand-more" size={25} color="white" />;
        }}
        items={reduxStationList}
      />
      {noDepartures ? (
        <Text style={styles.warningText}>
          No departures from selected station, please choose another
        </Text>
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
  },
  inputAndroid: {
    width: 300,
    height: 45,
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 50,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  warningText: {
    color: 'white',
  },
});
