import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import changeTravelTimeAction from '../actionCreators/changeTravelTimeAction';

// TIME PICKER SELECT
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TimePicker() {
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const dispatch = useDispatch();
  let fullTime;

  const handleTimeChange = (event) => {
    setOpenTimePicker(false);
    if (
      event.type === 'dismissed' ||
      event.nativeEvent.timestamp === reduxUserTravelTime.fullTime
    ) {
      return;
    }
    const hours = event.nativeEvent.timestamp.getHours();
    const mins = event.nativeEvent.timestamp.getMinutes();
    fullTime = event.nativeEvent.timestamp;
    dispatch(changeTravelTimeAction({ fullTime, hours, mins }));
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpenTimePicker(true)}
      >
        {reduxUserTravelTime.hours === 0 && reduxUserTravelTime.mins === 0 ? (
          <Text style={styles.textDisabled}>Select travel duration</Text>
        ) : (
          <Text style={styles.textEnabled}>
            {reduxUserTravelTime.hours} hours, {reduxUserTravelTime.mins}{' '}
            minutes
          </Text>
        )}

        {reduxSelectedStation.code ? (
          <Ionicons name="timer" size={24} color="red" />
        ) : (
          <Ionicons name="timer" size={24} color="gray" />
        )}
      </TouchableOpacity>
      {openTimePicker ? (
        <DateTimePicker
          value={reduxUserTravelTime.fullTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          minuteInterval={15}
          onChange={(event) => handleTimeChange(event)}
        />
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
  button: {
    height: 40,
    width: 300,
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  textDisabled: {
    color: '#c3c3c3',
  },
  textEnabled: {
    color: 'black',
  },
});
