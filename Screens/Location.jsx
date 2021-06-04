import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// expo install expo-location
// LOCATION
import * as Location from 'expo-location';

const LocationComponent = ({ navigation }) => {
  // LOCATION STATE
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // CALL TO LOCATION API
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => getLocation()}>
        <Text>Touch to get location</Text>
      </TouchableOpacity>
      <Text>Latitude = {location ? location.coords.latitude : 'pending'}</Text>
      <Text>
        Longitude = {location ? location.coords.longitude : 'pending'}
      </Text>
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
