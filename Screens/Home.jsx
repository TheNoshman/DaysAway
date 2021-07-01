import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import updateTimetableCacheAction from '../actionCreators/updateTimetableCacheAction';

// COMPONENTS
import Destination from '../Components/Destination';

// SERVICE FUNCTIONS
import { getStationTimetable } from '../serviceAPI';
import { getCachedTimetable, calculateLastTrain } from '../serviceFunctions';
import dayjs from 'dayjs';

import Swiper from 'react-native-deck-swiper';

import Card from '../Components/Card';
import IconButton from '../Components/IconButton';
import addLikedTripAction from '../actionCreators/addLikedTripAction';

// import OverlayLabel from '../Components/OverlayLabel';

const { height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  // REDUX
  const dispatch = useDispatch();
  const reduxHomeIsReady = useSelector((state) => state.reduxHomeIsReadyState);
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );

  console.log('HOME IS READY -', reduxHomeIsReady);

  // SWIPER HANDLERS

  return (
    <View style={styles.container}>
      {!reduxSeenDestinations ? (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <View style={styles.swiperContainer}>
            <Swiper
              animateCardOpacity
              containerStyle={styles.container}
              cards={reduxSeenDestinations}
              renderCard={(card) => (
                <Card navigation={navigation} card={card} />
              )}
              cardIndex={0}
              onTapCard={(event) => navigation.navigate('Details', { event })}
              backgroundColor="white"
              stackSize={2}
              infinite
              showSecondCard={true}
              animateOverlayLabelsOpacity
              onSwipedLeft={(e) => console.log('left', e)}
              onSwipedRight={(cardIndex) => {
                dispatch(addLikedTripAction(reduxSeenDestinations[cardIndex]));
                console.log('ADDED TRIP TO LIKED TRIPS');
              }}
              overlayLabels={{
                left: {
                  title: 'Not today',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30,
                    },
                  },
                },
                right: {
                  title: 'Lets go!',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30,
                    },
                  },
                },
              }}
            />
          </View>
          {/* BUTTONS */}
          <View style={styles.buttonsContainer}>
            <IconButton
              name="remove"
              // onPress={handleOnSwipedLeft}
              color="white"
              backgroundColor="#ffb01f"
              size={45}
            />
            <IconButton
              name="undo"
              // onPress={() => setCardIndex(cardIndex - 1)}
              color="white"
              backgroundColor="#d1d1d1"
              size={20}
            />
            <IconButton
              name="add"
              // onPress={() => setCardIndex(cardIndex + 1)}
              color="white"
              backgroundColor="#00dbdb"
              size={45}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  swiperContainer: {
    height: height - 115,
  },
  buttonsContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '15%',
    paddingTop: 10,
    paddingBottom: 25,
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
});

export default Home;
