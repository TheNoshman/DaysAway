import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TripItem({ journey }) {
  const trip = journey.item;

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,1)']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0.0, y: 0.8 }}
    >
      <Text>{trip.destination}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {},
});
