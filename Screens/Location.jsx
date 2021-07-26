import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

// REDUX
import { useSelector } from 'react-redux';

// STATION PICKER SELECT
import DropDownPicker from '../Components/DropDownPicker';
import TimePicker from '../Components/TimePicker';

const { height, width } = Dimensions.get('window');

// LOCATION SCREEN USED FOR CHANGING THE USERS STATION AND JOURNEY TIME ONCE PAST THE MODAL
const LocationComponent = ({ navigation }) => {
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);

  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      <SafeAreaView style={styles.container}>
        <Text>
          Latitude ={' '}
          {reduxLocationValue ? reduxLocationValue.coords.latitude : 'pending'}
        </Text>
        <Text>
          Longitude ={' '}
          {reduxLocationValue ? reduxLocationValue.coords.longitude : 'pending'}
        </Text>

        {/* STATION PICKER */}
        <DropDownPicker />

        {/* TIME PICKER */}
        <TimePicker />
      </SafeAreaView>
    </ImageBackground>
  );
};

// ################## STYLES ##################
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
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

export default LocationComponent;
