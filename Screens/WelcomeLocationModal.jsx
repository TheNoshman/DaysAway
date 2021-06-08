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

// STATION PICKER SELECT
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react/cjs/react.development';

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
    const stationAPIResult = await findLocalTrainStations(locationResult);

    const stationList = stationAPIResult.member.map((el) => {
      return { label: el.name, value: el.tiploc_code };
    });
    console.log('lst = ', stationList);

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

  // Handles station selection

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
          onValueChange={(value) => console.log(value)}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Select a station...', value: null }}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="red" />;
          }}
          items={reduxStationList}
        />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text>Touch to enter</Text>
      </TouchableOpacity>

      {/* ############ TESTING ############# */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxLocationValue)}
      >
        <Text>get redux station data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxStationList)}
      >
        <Text>get state</Text>
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
  disabled: {
    backgroundColor: 'grey',
  },
});

export default WelcomeLocationModal;
