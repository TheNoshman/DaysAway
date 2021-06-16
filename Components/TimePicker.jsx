import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import changeTravelTimeAction from '../actionCreators/changeTravelTimeAction';

// TIME PICKER SELECT
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react';

export default function TimePicker() {
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);
  const dispatch = useDispatch();
  let fullTime;

  // SETS VALUE OF REDUX TIME TO MIDNIGHT LAST NIGHT
  useEffect(() => {
    fullTime = new Date();
    fullTime.setHours(0, 0, 0, 0);
    dispatch(changeTravelTimeAction({ fullTime, hours: 0, mins: 0 }));
  }, []);

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
        <Text>Select travel duration</Text>
      </TouchableOpacity>
      {reduxUserTravelTime ? (
        <Text>
          Travel time: {reduxUserTravelTime.hours} hours,{' '}
          {reduxUserTravelTime.mins} mins
        </Text>
      ) : null}
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
