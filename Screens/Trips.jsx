import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TripItem from '../Components/TripItem';

const { height, width } = Dimensions.get('window');

const Trips = () => {
  const reduxLikedTrips = useSelector((state) => state.reduxLikedTrips);

  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      <SafeAreaView>
        <View>
          <Text>Trips screen</Text>
          <FlatList
            data={reduxLikedTrips}
            keyExtractor={(item, index) => item.destination + index}
            renderItem={(item) => <TripItem journey={item} />}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Trips;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
});
