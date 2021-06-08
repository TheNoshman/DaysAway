import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';

// LOCATION
import { getLocationAPI } from '../serviceAPI';

// SERVICE API
import { findLocalTrainStations } from '../serviceAPI';
import changeLocalTrainStationsAction from '../actionCreators/changeLocalTrainStationsAction';
import changeSelectedTrainStationAction from '../actionCreators/changeSelectedTrainStationAction';

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
  // dispatches actions to redux
  const dispatch = useDispatch();

  // ################## FUNCTIONS ##################
  // CALL TO LOCATION API, SAVES LOCATION AND STATION LIST TO REDUX
  const getLocation = async () => {
    const locationResult = await getLocationAPI();
    dispatch(changeUserLocationAction(locationResult));
    const stationAPIResult = await findLocalTrainStations(locationResult);
    const stationList = stationAPIResult.member.map((el) => {
      return { label: el.name, value: el.station_code };
    });
    dispatch(changeLocalTrainStationsAction(stationList));
  };
  // 'Enter' navigation handler - closes modal and navs to Home page
  const handleSubmit = useCallback(() => {
    if (reduxLocationValue.timestamp === 0) {
      Alert.alert(
        'No location found',
        'Please pinpoint your current location',
        [{ text: 'Lets go!' }],
      );
    } else if (reduxSelectedStation === 'station_code') {
      Alert.alert(
        'No station selected',
        'Please select the train station you would like to depart from.',
        [{ text: 'Lets go!' }],
      );
    } else {
      navigation.navigate('Main');
    }
    // Added dependency, might cause issues later
  }, [reduxLocationValue, navigation, reduxSelectedStation]);

  // ################## RENDER COMPONENT ##################
  return (
    <View style={styles.container}>
      {/* GET LOCATION TOUCHABLE */}
      <TouchableOpacity style={styles.button} onPress={() => getLocation()}>
        <Text>Touch to get location</Text>
      </TouchableOpacity>
      <Text>
        Latitude ={' '}
        {reduxLocationValue ? reduxLocationValue.coords.latitude : 'pending'}
      </Text>
      <Text>
        Longitude ={' '}
        {reduxLocationValue ? reduxLocationValue.coords.longitude : 'pending'}
      </Text>

      {/* STATION PICKER */}
      {reduxStationList.length > 1 ? (
        <RNPickerSelect
          style={{
            ...styles,
            iconContainer: {
              top: 18,
              right: 18,
            },
          }}
          onValueChange={(value) =>
            dispatch(changeSelectedTrainStationAction(value))
          }
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Select a station...', value: null }}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="red" />;
          }}
          items={reduxStationList}
        />
      ) : null}

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
