import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TripItem({ journey }) {
  const trip = journey.item;

  return (
    <View>
      <Text>{trip.destination}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
