import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import ActivitiesDetailNode from './ActivitiesDetailNode';

export default function DetailsLowerActivities({ journey }) {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={journey.localPlaces.features}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <ActivitiesDetailNode activity={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
