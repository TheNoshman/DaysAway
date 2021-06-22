import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function Destination({ train }) {
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );

  return (
    <View style={styles.container}>
      <Text>From: {reduxSelectedStation.name}</Text>
      <Text>To: {train.destination}</Text>
      <Text>Departing at: {train.callingAt[0].aimed_departure_time}</Text>
      <Text>Calling at:</Text>
      <FlatList
        style={styles.list}
        data={train.callingAt}
        keyExtractor={(item) => item.station_code}
        renderItem={({ item }) =>
          item.station_code !== reduxSelectedStation.code ? (
            <Text>{item.station_name}</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
