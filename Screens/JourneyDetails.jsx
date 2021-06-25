import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getPlaceLocation, getListOfPlaces } from '../serviceAPI';
import updateJourneyWithLocation from '../actionCreators/updateJourneyWithLocation';

const JourneyDetails = (event) => {
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );

  // INDEX OF SELECTED CARD
  const journey = reduxSeenDestinations[event.route.params.event];
  console.log('CARD INDEX SEEN DESTINATIONS', journey);

  useEffect(() => {
    (async () => {
      console.log('IN USE EFFECT');
      const location = await getPlaceLocation(
        reduxSeenDestinations[event.route.params.event],
      );
      console.log('location = ', location);

      const placeList = await getListOfPlaces(location);

      journey.localPlaces = placeList;
      console.log('journey = ', journey);
      updateJourneyWithLocation(journey);
    })();
  }, [event.route.params.event, reduxSeenDestinations]);

  return (
    <SafeAreaView>
      <Text> journey details</Text>
      <Text>From</Text>
      <Text>To</Text>
      <Text>Departing</Text>
      <Text>Arriving</Text>
      <Text>Changing at</Text>
      <Text>Travel time</Text>
      <Text>Train status</Text>
      <Text>Weather</Text>
      <Text>Things to see</Text>
    </SafeAreaView>
  );
};

export default JourneyDetails;
