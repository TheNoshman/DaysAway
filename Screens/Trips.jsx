import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TripItem from '../Components/TripItem';

const Trips = () => {
  const reduxLikedTrips = useSelector((state) => state.reduxLikedTrips);

  return (
    <SafeAreaView>
      <View>
        <Text>Trips screen</Text>
        <FlatList
          data={reduxLikedTrips}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <TripItem journey={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Trips;
