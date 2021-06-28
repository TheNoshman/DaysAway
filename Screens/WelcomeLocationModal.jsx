import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';
import changeLocalTrainStationsAction from '../actionCreators/changeLocalTrainStationsAction';

// SERVICE API FUNCTIONS
import { distanceCalculator } from '../serviceFunctions';
import { findLocalTrainStations, getLocationAPI } from '../serviceAPI';

// PICKERS SELECT
import DropDownPicker from '../Components/DropDownPicker';
import TimePicker from '../Components/TimePicker';
import changeTravelTimeAction from '../actionCreators/changeTravelTimeAction';

const WelcomeLocationModal = ({ navigation }) => {
  // ################## VARIABLES ##################
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const reduxTimetables = useSelector((state) => state.reduxTimetableCache);
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
  const dispatch = useDispatch();

  // ################## FUNCTIONS ##################
  // CALL TO LOCATION API, SAVES LOCATION AND STATION LIST TO REDUX
  useEffect(() => {
    (async () => {
      // SETS VALUE OF REDUX USER TIME TO MIDNIGHT LAST NIGHT
      if (reduxUserTravelTime.fullTime === 0) {
        const fullTime = new Date();
        fullTime.setHours(0, 0, 0, 0);
        dispatch(changeTravelTimeAction({ fullTime }));
      }
      // LOCATION
      const locationResult = await getLocationAPI();
      dispatch(changeUserLocationAction(locationResult));
      const stationAPIResult = await findLocalTrainStations(locationResult);
      const stationList = stationAPIResult.member.map((el) => {
        const distance = distanceCalculator(
          locationResult.coords.latitude.toFixed(3),
          locationResult.coords.longitude.toFixed(3),
          el.latitude.toFixed(3),
          el.longitude.toFixed(3),
        ).toFixed(1);
        return {
          label: `${el.name}, ${distance} miles away`,
          value: { code: el.station_code, name: el.name },
        };
      });
      dispatch(changeLocalTrainStationsAction(stationList));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NAVIGATION HANDLER -> ENTERS THE MAIN STACK
  const handleSubmit = useCallback(async () => {
    if (reduxSelectedStation.code === null) {
      Alert.alert(
        'No station selected',
        'Please select the train station you would like to depart from.',
        [{ text: 'Lets go!' }],
      );
    } else if (!reduxUserTravelTime.dayjsTime) {
      Alert.alert(
        'No journey time selected',
        'Please select the amount of time you would like to spend travelling',
        [{ text: 'Lets go!' }],
      );
    } else {
      navigation.navigate('Main');
    }
    // Added dependency, might cause issues later
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxSelectedStation, reduxUserTravelTime.dayjsTime]);

  // ################## RENDER COMPONENT ##################
  return (
    <View style={styles.container}>
      <Text>
        {reduxLocationValue.coords.latitude !== 0
          ? 'Location success'
          : 'Locating...'}
      </Text>

      {/* STATION DROPDOWN PICKER */}
      <DropDownPicker />
      {/* TIME PICKER */}
      <TimePicker />
      {/* ENTER APP TOUCHABLE */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit()}
        disabled={reduxSeenDestinations.length < 2 ? true : false}
      >
        <Text>Touch to enter</Text>
      </TouchableOpacity>

      {/* ############ TESTING ############# */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxLocationValue)}
      >
        <Text>get redux location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxStationList)}
      >
        <Text>get redux station list</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxSelectedStation)}
      >
        <Text>get redux selected station</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxTimetables[0])}
      >
        <Text>get redux timetable</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxUserTravelTime)}
      >
        <Text>get user time</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxSeenDestinations)}
      >
        <Text>get seen destinations redux</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default WelcomeLocationModal;
