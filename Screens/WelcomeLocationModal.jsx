import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';

// LOCATION
import * as Location from 'expo-location';

// SERVICE API
import { findLocalTrainStations } from '../serviceAPI';

const WelcomeLocationModal = ({ navigation }) => {
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

  // 'Enter' navigation handler - closes modal and navs to Home page
  const handleSubmit = useCallback(() => {
    if (reduxLocationValue.timestamp !== 0) {
      navigation.navigate('Main');
    } else {
      Alert.alert(
        'No location found',
        'Please pinpoint your current location',
        [{ text: 'Lets go!' }],
      );
    }
  }, [reduxLocationValue]);

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
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text>Touch to enter</Text>
      </TouchableOpacity>
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

export default WelcomeLocationModal;
