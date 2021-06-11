import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';
import changeLocalTrainStationsAction from '../actionCreators/changeLocalTrainStationsAction';
import changeSelectedTrainStationAction from '../actionCreators/changeSelectedTrainStationAction';
import addTimetableToCacheAction from '../actionCreators/addTimetableToCacheAction';

// SERVICE API FUNCTIONS
import {
  distanceCalculator,
  getCachedTimetable,
  getLocationAPI,
  getStationTimetable,
} from '../serviceAPI';

// SERVICE API
import { findLocalTrainStations } from '../serviceAPI';

// STATION PICKER SELECT
import RNPickerSelect from 'react-native-picker-select';

const WelcomeLocationModal = ({ navigation }) => {
  // ################## VARIABLES ##################
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const reduxTimetables = useSelector((state) => state.reduxTimetableCache);
  const dispatch = useDispatch();

  // ################## FUNCTIONS ##################
  // CALL TO LOCATION API, SAVES LOCATION AND STATION LIST TO REDUX
  useEffect(() => {
    (async () => {
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
  }, [dispatch]);

  // 'Enter' navigation handler - closes modal and navs to Home page
  const handleSubmit = useCallback(async () => {
    if (reduxLocationValue.timestamp === 0) {
      Alert.alert(
        'No location found',
        'Please pinpoint your current location',
        [{ text: 'Lets go!' }],
      );
    } else if (reduxSelectedStation.code === null) {
      Alert.alert(
        'No station selected',
        'Please select the train station you would like to depart from.',
        [{ text: 'Lets go!' }],
      );
    } else {
      navigation.navigate('Main');
    }
    // Added dependency, might cause issues later
  }, [navigation, reduxLocationValue.timestamp, reduxSelectedStation]);

  // ################## RENDER COMPONENT ##################
  return (
    <View style={styles.container}>
      <Text>
        {reduxLocationValue.coords.latitude !== 0
          ? 'Location success'
          : 'Locating...'}
      </Text>
      {/* STATION PICKER */}
      <RNPickerSelect
        style={{
          ...styles,
          iconContainer: {
            top: 18,
            right: 18,
          },
        }}
        onValueChange={async (value) => {
          if (value === null) {
            return;
          }
          const { payload } = dispatch(changeSelectedTrainStationAction(value));
          const cachedTimetable = getCachedTimetable(
            reduxTimetables,
            value.code,
          );
          console.log('cached tt', cachedTimetable);

          if (!cachedTimetable.length) {
            const timetable = await getStationTimetable(payload.code);
            dispatch(addTimetableToCacheAction(timetable));
          }
        }}
        disabled={reduxStationList.length > 1 ? false : true}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: 'Select a station...', value: null }}
        Icon={() => {
          if (reduxStationList.length > 1) {
            return <Ionicons name="md-arrow-down" size={24} color="red" />;
          } else {
            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
          }
        }}
        items={reduxStationList}
      />

      {/* ENTER APP TOUCHABLE */}
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
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
        onPress={() => console.log(reduxTimetables)}
      >
        <Text>get redux timetable</Text>
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
