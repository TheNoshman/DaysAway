import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function JourneyDetails(event) {
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
  // INDEX OF SELECTED CARD
  const cardIndex = reduxSeenDestinations[event.route.params.event];
  console.log('CARD INDEX SEEN DESTINATIONS', cardIndex);

  return (
    <SafeAreaView>
      <Text> journey details</Text>
    </SafeAreaView>
  );
}
