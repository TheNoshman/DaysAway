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

// 'LIKED' TRIPS SCREEN CONTAINING TRIP ITEM COMPONENTS IN LIST
const Trips = ({ navigation }) => {
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
            <Text style={styles.pageTitle}>Your Journeys</Text>
            <Icon name="list" size={30} color="white" />
          </View>
          <FlatList
            data={reduxLikedTrips}
            keyExtractor={(item, index) => item.destination + index}
            renderItem={(item, index) => (
              <TripItem journey={item} navigation={navigation} />
            )}
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
    marginLeft: 10,
    marginVertical: 20,
    marginRight: 20,
  },

  pageTitle: {
    fontSize: 45,
    color: 'white',
  },
});
