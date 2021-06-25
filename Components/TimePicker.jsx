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
import { getListOfPlaces, getPlaceLocation, getStops } from '../serviceAPI';

export default function TimePicker() {
  // OPEN TIMEPICKER STATE
  const [openTimePicker, setOpenTimePicker] = useState(false);
  // REDUX
  const dispatch = useDispatch();
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);
  const reduxTimetables = useSelector((state) => state.reduxTimetableCache);
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
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

    const seenDest = [];
    for (let index = 0; index < 3; index++) {
      const stops = await getStops(reduxTimetables[timetableIndex]);
      const result = await calculateLastStop(
        stops,
        time.payload.dayjsTime.diff(
          dayjs().hour(0).minute(0).second(0),
          'minutes',
        ),
      );
      console.log('RESULT = ', result[2].destination.station_name);

      console.log('seenDest = ', seenDest);

      if (
        seenDest.some((train) => train === result[2].destination.station_code)
      ) {
        console.log('seen before');
        index--;
      } else {
        const placeList = await getListOfPlaces(
          await getPlaceLocation(result[2].destination.station_name),
        );
        seenDest.push(result[2].destination.station_code);
        dispatch(
          addSeenDestinationAction({
            destination: result[result.length - 1].destination.station_name,
            from: result[0].journeyRoute[0].station_name,
            departureTime:
              result[0].journeyRoute[0].departures.calculatedJourneys[0]
                .callingAt[0].aimed_departure_time,
            travelTime: time.payload.dayjsTime.subtract(
              result[1].remainingTime,
              'minute',
            ),
            localPlaces: placeList,
            details: result,
          }),
        );
      }
    }

    // SAVE ROUTE & DESTINATION TO REDUX
    // dispatch(
    //   addSeenDestinationAction({
    //     destination: result[result.length - 1].destination.station_name,
    //     from: result[0].journeyRoute[0].station_name,
    //     departureTime:
    //       result[0].journeyRoute[0].departures.calculatedJourneys[0]
    //         .callingAt[0].aimed_departure_time,
    //     travelTime: time.payload.dayjsTime.subtract(
    //       result[1].remainingTime,
    //       'minute',
    //     ),
    //     details: result,
    //   }),
    // );
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
          <Ionicons name="timer" size={24} color="#00dbdb" />
        ) : (
          <Ionicons name="timer" size={24} color="#ffb01f" />
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
