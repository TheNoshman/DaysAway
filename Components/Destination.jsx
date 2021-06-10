import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Destination({ train }) {
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  return (
    <View style={styles.container}>
      <Text>From: {reduxSelectedStation.name}</Text>
      <Text>To: {train.destination_name}</Text>
      <Text>Time: {train.aimed_departure_time}</Text>
      <Text>Platform: {train.platform}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
