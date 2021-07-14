import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ActivitiesDetailNode({ activity }) {
  console.log('ACTIVITY = ', activity);

  const tags = activity.item.properties.kinds.split(',').map((element) => {
    return element.replace(/_/g, ' ');
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text>{activity.item.properties.name}</Text>
        <Text>User rating: {activity.item.properties.rate}</Text>
        <Text>
          Distance from station: {activity.item.properties.dist.toFixed(0)}m
        </Text>
      </View>
      <View style={styles.tagBox}>
        <Text>{tags[0]}</Text>
        <Text>{tags[1]}</Text>
        <Text>{tags[2]}</Text>
        <Text>{tags[3]}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    borderColor: 'red',
    borderWidth: 2,
    margin: 5,
  },
  topBox: {
    borderColor: 'red',
    borderWidth: 2,
    height: 75,
    width: 300,
  },
  tagBox: {
    justifyContent: 'flex-end',
    borderColor: 'red',
    borderWidth: 2,
    height: 75,
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
