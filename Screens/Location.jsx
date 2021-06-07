import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';

// expo install expo-location
// LOCATION
import * as Location from 'expo-location';

// SERVICE API
import { findLocalTrainStations } from '../serviceAPI';

const LocationComponent = ({ navigation }) => {
  // LOCATION API ERROR STATE
  let [errorMsg, setErrorMsg] = useState(null);

  // Redux location from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);

  // dispatches actions to redux
  const dispatch = useDispatch();

  // CALL TO LOCATION API
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return console.error(errorMsg);
    }
    let locationResult = await Location.getCurrentPositionAsync({});
    dispatch(changeUserLocationAction(locationResult));

    console.log('get user stations = ', findLocalTrainStations(locationResult));
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxLocationValue)}
      >
        <Text>get redux data</Text>
      </TouchableOpacity>
    </View>
  );
};

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
});

export default LocationComponent;
