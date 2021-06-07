import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';

// LOCATION
import { getLocationAPI } from '../serviceAPI';

// SERVICE API
import { findLocalTrainStations } from '../serviceAPI';
import changeLocalTrainStationsAction from '../actionCreators/changeLocalTrainStationsAction';

const WelcomeLocationModal = ({ navigation }) => {
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);

  // dispatches actions to redux
  const dispatch = useDispatch();

  // CALL TO LOCATION API
  const getLocation = async () => {
    const locationResult = await getLocationAPI();
    dispatch(changeUserLocationAction(locationResult));
    const stationList = await findLocalTrainStations(locationResult);
    dispatch(changeLocalTrainStationsAction(stationList));
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
    // Added dependency, might cause issues later
  }, [reduxLocationValue, navigation]);

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxStationList.member)}
      >
        <Text>get station data</Text>
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
