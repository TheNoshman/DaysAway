import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function Destination({ train }) {
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  console.log('train in dest = ', train);

  return (
    <View style={styles.container}>
      <Text>From: {reduxSelectedStation.name}</Text>
      <Text>To: {train.destination_name}</Text>
      <Text>Departing at: {train.aimed_departure_time}</Text>
      <Text>Calling at:</Text>
      <FlatList
        style={styles.list}
        data={train.callingAt}
        keyExtractor={(item) => item.station_code}
        renderItem={({ item }) => <Text>{item.station_name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
