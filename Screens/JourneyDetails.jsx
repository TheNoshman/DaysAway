import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getAttractions } from '../serviceAPI';

export default function JourneyDetails(event) {
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
  // INDEX OF SELECTED CARD
  const cardIndex = reduxSeenDestinations[event.route.params.event];
  console.log('CARD INDEX SEEN DESTINATIONS', cardIndex);

  getAttractions(cardIndex.destination);

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
}
