import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import ActivitiesDetailNode from './ActivitiesDetailNode';

// DETAILS COMPONENT CONTAINING ACTIVITIES
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
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  },
});
