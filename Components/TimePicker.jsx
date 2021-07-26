import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import changeTravelTimeAction from '../actionCreators/changeTravelTimeAction';
import addSeenDestinationAction from '../actionCreators/addSeenDestinationAction';

// COMPONENTS
import DateTimePicker from '@react-native-community/datetimepicker';

// SERVICE FUNCTIONS
import { getCardData } from '../serviceAPI';

// TIME PICKER COMPONENT FOR WELCOME MODAL
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
  // ###########################################
  // RUNS API CALLS & ALGORITHM AUTOMATICALLY ON TIME CHANGE FOR DEMO PURPOSES, FOR PRODUCTION CHANGE THIS TO ON ENTER BUTTON PRESS
  // ###########################################
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
    const userJourneyTime = time.payload.dayjsTime.diff(
      dayjs().hour(0).minute(0).second(0),
      'minutes',
    );
    const cardPromisesArray = [];
    for (let i = 0; i < 3; i++) {
      cardPromisesArray.push(
        getCardData(reduxTimetables, timetableIndex, userJourneyTime, time, i),
      );
    }
    const resolvedCardPromises = await Promise.all(cardPromisesArray);
    resolvedCardPromises.forEach(
      ({
        result,
        placeList,
        cardPhotosArray,
        travelTimeMins,
        travelTimeDayjs,
        weatherData,
      }) => {
        dispatch(
          addSeenDestinationAction({
            destination: result[result.length - 1].destination.station_name,
            from: result[0].journeyRoute[0].station_name,
            departureTime:
              result[0].journeyRoute[0].departures.calculatedJourneys[0]
                .callingAt[0].aimed_departure_time,
            travelTime: { travelTimeMins, travelTimeDayjs },
            localPlaces: placeList,
            cardPhotosArray,
            details: result,
            weatherData: weatherData,
          }),
        );
      },
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
        <Icon name="schedule" size={25} color="white" />
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
    height: 45,
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    borderColor: 'white',
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textEnabled: {
    color: 'white',
    fontSize: 17,
  },
  textDisabled: {
    color: '#c3c3c3',
    fontSize: 17,
  },
});
