import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Trips = () => {
  // PULLED FROM HOME.JS
  // const handleRefresh = async () => {
  //   setIsRefreshing(true);
  //   const timetable = await getStationTimetable(reduxSelectedStation.code);
  //   dispatch(updateTimetableCacheAction(timetable));

  //   const timetableIndex = reduxTimetables.findIndex(
  //     (tt) => tt.station_code === reduxSelectedStation.code,
  //   );
  //   const userTravelTime = reduxUserTravelTime.dayjsTime.diff(
  //     dayjs().hour(0).minute(0).second(0),
  //     'minutes',
  //   );
  //   calculateLastTrain(reduxTimetables[timetableIndex], userTravelTime);
  //   setIsRefreshing(false);
  // };

  // GRABS TIMETABLE FROM THE CACHE
  // const timetable = getCachedTimetable(
  //   reduxTimetables,
  //   reduxSelectedStation.code,
  // );

  return (
    <SafeAreaView>
      <View>
        <Text>Trips screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Trips;
