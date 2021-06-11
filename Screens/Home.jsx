import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import updateTimetableCacheAction from '../actionCreators/updateTimetableCacheAction';

// COMPONENTS
import Destination from '../Components/Destination';
import { getCachedTimetable, getStationTimetable } from '../serviceAPI';

const Home = () => {
  // STATE FOR REFRESH
  const [isRefreshing, setIsRefreshing] = useState(false);
  const reduxTimetableCache = useSelector((state) => state.reduxTimetableCache);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const dispatch = useDispatch();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const timetable = await getStationTimetable(reduxSelectedStation.code);

    // Need to update, not just add to
    dispatch(updateTimetableCacheAction(timetable));

    setIsRefreshing(false);
  };

  // GRABS TIMETABLE FROM THE CACHE
  const timetable = getCachedTimetable(
    reduxTimetableCache,
    reduxSelectedStation.code,
  );

  return (
    <SafeAreaView>
      <View>
        {!timetable.length ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={timetable[0].departures.all}
            keyExtractor={(item) => item.train_uid}
            renderItem={({ item }) => <Destination train={item} />}
            refreshing={isRefreshing}
            onRefresh={() => handleRefresh()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
