import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JourneyDetails(event) {
  // INDEX OF SELECTED CARD
  const cardIndex = event.route.params.event;
  console.log('cardIndex', cardIndex);

  return (
    <SafeAreaView>
      <Text> journey details</Text>
    </SafeAreaView>
  );
}
