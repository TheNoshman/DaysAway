import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import updateTimetableCacheAction from '../actionCreators/updateTimetableCacheAction';

// COMPONENTS
import Destination from '../Components/Destination';
import { getCachedTimetable, getStationTimetable } from '../serviceAPI';
import { calculateLastTrain } from '../serviceFunctions';
import dayjs from 'dayjs';

const Home = () => {
  // STATE FOR REFRESH
  const [isRefreshing, setIsRefreshing] = useState(false);
  const reduxTimetables = useSelector((state) => state.reduxTimetables);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);

  const dispatch = useDispatch();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const timetable = await getStationTimetable(reduxSelectedStation.code);
    dispatch(updateTimetableCacheAction(timetable));

    const timetableIndex = reduxTimetables.findIndex(
      (tt) => tt.station_code === reduxSelectedStation.code,
    );
    const userTravelTime = reduxUserTravelTime.dayjsTime.diff(
      dayjs().hour(0).minute(0).second(0),
      'minutes',
    );
    calculateLastTrain(reduxTimetables[timetableIndex], userTravelTime);
    setIsRefreshing(false);
  };

  // GRABS TIMETABLE FROM THE CACHE
  const timetable = getCachedTimetable(
    reduxTimetables,
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
            data={timetable.departures.calculatedJourneys}
            keyExtractor={(item) => item.id}
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
