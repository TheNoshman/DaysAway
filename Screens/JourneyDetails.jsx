import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

// DETAILS MODAL SCREEN
import DetailsLower from '../Components/DetailsLower';

const { height, width } = Dimensions.get('window');

const JourneyDetails = (event) => {
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
  // INDEX OF SELECTED CARD
  let journey = reduxSeenDestinations[event.route.params.event];
  if (!journey) {
    journey = reduxSeenDestinations[event.route.params.event.index];
  }

  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.upperContainer}>
          <Text style={styles.mainTitle}>{journey.destination}</Text>
          <Text style={styles.subTitle}>
            Please select a tab below for detailed information:
          </Text>
        </View>
        <View style={styles.lowerContainer}>
          <DetailsLower journey={journey} />
        </View>
        <View>
          <TouchableOpacity style={styles.ticketsContainer}>
            <Text style={styles.buyTicketText}>Search For Tickets</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default JourneyDetails;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
  },
  upperContainer: {},
  mainTitle: {
    fontSize: 60,
    color: 'white',
    textAlign: 'left',
    width: width,
    paddingHorizontal: 10,
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    width: width,
    padding: 10,
  },
  lowerContainer: {
    marginVertical: 10,
    width: '95%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
  },
  ticketsContainer: {
    height: 50,
    width: 300,
    borderRadius: 50,
    margin: 20,
    marginBottom: 30,
    backgroundColor: '#88c5f7',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyTicketText: {
    color: 'white',
    fontSize: 22,
    textAlignVertical: 'center',
  },
});
