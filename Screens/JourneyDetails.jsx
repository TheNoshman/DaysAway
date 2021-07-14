import React, { useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getPlaceLocation, getListOfPlaces } from '../serviceAPI';
import updateJourneyWithLocation from '../actionCreators/updateJourneyWithLocation';
import DetailsLower from '../Components/DetailsLower';

const { height, width } = Dimensions.get('window');

const JourneyDetails = (event) => {
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );

  // INDEX OF SELECTED CARD
  const journey = reduxSeenDestinations[event.route.params.event];
  console.log('CARD INDEX SEEN DESTINATIONS', journey);

  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.upperContainer}></View>
        <View style={styles.lowerContainer}>
          <DetailsLower />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default JourneyDetails;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
    justifyContent: 'center',
  },
  mainContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
  },
  upperContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 200,
  },
  lowerContainer: {
    borderColor: 'red',
    borderWidth: 2,
    height: height - 100,
    marginVertical: 10,
    width: '95%',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 20,
  },
});

/* <Text> journey details</Text>
  <Text>From</Text>
  <Text>To</Text>
  <Text>Departing</Text>
  <Text>Arriving</Text>
  <Text>Changing at</Text>
  <Text>Travel time</Text>
  <Text>Train status</Text>
  <Text>Weather</Text>
  <Text>Things to see</Text> */
