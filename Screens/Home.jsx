import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import addLikedTripAction from '../actionCreators/addLikedTripAction';

// COMPONENTS
import Spinner from 'react-native-loading-spinner-overlay';
import Swiper from 'react-native-deck-swiper';
import Card from '../Components/Card';

// import OverlayLabel from '../Components/OverlayLabel';

const { height, width } = Dimensions.get('window');

// MAIN HOME SCREEN CONTAINING CARD
const Home = ({ navigation }) => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 12000);
  }, [spinner]);

  // REDUX
  const dispatch = useDispatch();
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
  let useSwiper = useRef(null);

  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      {/* SPINNER LOADING SCREEN */}
      {spinner ? (
        <Spinner
          visible={true}
          textContent={'Searching DaysAway...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.swiperContainer}>
              {/* SWIPER DECK COMPONENT */}
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
                  dispatch(
                    addLikedTripAction(reduxSeenDestinations[cardIndex]),
                  );
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
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
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
