import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// COMPONENTS
import Destination from '../Components/Destination';

const Home = () => {
  const reduxTimetable = useSelector((state) => state.reduxStationTimetable);

  return (
    <SafeAreaView>
      <View>
        {reduxTimetable === null ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={reduxTimetable.departures.all}
            keyExtractor={(item) => item.train_uid}
            renderItem={({ item }) => <Destination train={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
