import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import changeTimetableAction from '../actionCreators/changeTimetableAction';

// COMPONENTS
import Destination from '../Components/Destination';
import { getStationTimetable } from '../serviceAPI';

const Home = () => {
  // STATE FOR REFRESH
  const [isRefreshing, setIsRefreshing] = useState(false);
  const reduxTimetable = useSelector((state) => state.reduxStationTimetable);
  const dispatch = useDispatch();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const timetable = await getStationTimetable(reduxTimetable.station_code);
    dispatch(changeTimetableAction(timetable));
    setIsRefreshing(false);
  };

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
