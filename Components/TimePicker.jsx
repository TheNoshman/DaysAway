import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import changeTravelTimeAction from '../actionCreators/changeTravelTimeAction';
import addSeenDestinationAction from '../actionCreators/addSeenDestinationAction';
// SERVICE FUNCTIONS
import { calculateLastStop } from '../serviceFunctions';
// COMPONENTS
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimePicker() {
  // OPEN TIMEPICKER STATE
  const [openTimePicker, setOpenTimePicker] = useState(false);
  // REDUX
  const dispatch = useDispatch();
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);
  const reduxTimetables = useSelector((state) => state.reduxTimetableCache);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );

  // ON TIME CHANGE HANDLER
  const handleTimeChange = async (event) => {
    setOpenTimePicker(false);
    if (
      event.type === 'dismissed' ||
      event.nativeEvent.timestamp.getTime() ===
        reduxUserTravelTime.fullTime.getTime()
    ) {
      return;
    }
    // SAVE USER TIME TO REDUX STORE
    const time = dispatch(
      changeTravelTimeAction({
        fullTime: event.nativeEvent.timestamp,
        dayjsTime: dayjs(event.nativeEvent.timestamp),
      }),
    );
    // GET CURRENT SELECTED TIMETABLE FROM CACHE
    const timetableIndex = reduxTimetables.findIndex(
      (timetable) => timetable.station_code === reduxSelectedStation.code,
    );
    // CALCULATE ROUTE & DESTINATION
    const result = await calculateLastStop(
      reduxTimetables[timetableIndex],
      time.payload.dayjsTime.diff(
        dayjs().hour(0).minute(0).second(0),
        'minutes',
      ),
    );
    console.log('resuly', result);

    // SAVE ROUTE & DESTINATION TO REDUX
    dispatch(
      addSeenDestinationAction({
        destination: result[result.length - 1].destination.station_name,
        departureTime: result[0].journeyRoute[0].station_name,
        travelTime: time.payload.dayjsTime.subtract(result[1].remainingTime),
        details: result,
      }),
    );
  };

  return (
    <View>
      <TouchableOpacity
        disabled={reduxTimetables.length ? false : true}
        style={styles.button}
        onPress={() => setOpenTimePicker(true)}
      >
        {reduxUserTravelTime.dayjsTime ? (
          <Text style={styles.textEnabled}>
            {reduxUserTravelTime.dayjsTime.hour()} hours{' '}
            {reduxUserTravelTime.dayjsTime.minute()} minutes
          </Text>
        ) : (
          <Text style={styles.textDisabled}>Select travel duration</Text>
        )}
        {reduxTimetables.length ? (
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
