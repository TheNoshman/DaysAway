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
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Your saved journeys</Text>
            <Icon name="list" size={30} color="black" />
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    marginLeft: 10,
    marginVertical: 20,
    marginRight: 20,
  },

  pageTitle: {
    fontSize: 30,
    color: 'black',
  },
});
