import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS

// SERVICE FUNCTIONS

import Swiper from 'react-native-deck-swiper';

import Card from '../Components/Card';

import addLikedTripAction from '../actionCreators/addLikedTripAction';

import OverlayLabel from '../Components/OverlayLabel';

const { height, width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  // REDUX
  const dispatch = useDispatch();

  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );

  let useSwiper = useRef(null);

  const handleOnSwipedLeft = () => useSwiper.onSwipedLeft();
  const handleOnSwipedRight = () => useSwiper.swipeRight();

  // SWIPER HANDLERS

  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={useSwiper}
              animateCardOpacity
              containerStyle={styles.container}
              cards={reduxSeenDestinations}
              renderCard={(card) => (
                <Card navigation={navigation} card={card} />
              )}
              verticalSwipe={false}
              cardIndex={0}
              onTapCard={(event) => navigation.navigate('Details', { event })}
              stackSize={2}
              backgroundColor={'transparent'}
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
                  title: 'Nah',
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
                  title: 'Yah!',
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  swiperContainer: {
    height: height - 100,
    backgroundColor: 'transparent',
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
