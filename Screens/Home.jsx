import React, { useRef } from 'react';
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
// import OverlayLabel from '../Components/OverlayLabel';

const { height } = Dimensions.get('window');

// const photoCards = [
//   {
//     name: 'Austin Wade',
//     age: 22,
//     photo: require('../assets/01.jpg'),
//     key: 'caseex6qfO4TPMYyhorner',
//   },
//   {
//     name: 'Aleksander Borzenets',
//     age: 28,
//     photo: require('../assets/02.jpg'),
//     key: 'ozda-XbeP0k',
//   },
// ];

const Home = ({ navigation }) => {
  // REDUX
  const dispatch = useDispatch();
  const reduxHomeIsReady = useSelector((state) => state.reduxHomeIsReadyState);
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );

  // SWIPER HANDLERS
  const useSwiper = useRef(null).current;
  const handleOnSwipedLeft = () => useSwiper.swipeLeft();
  const handleOnSwipedRight = () => useSwiper.swipeRight();
  console.log('useSwiper', useSwiper);

  return (
    <View style={styles.container}>
      {reduxHomeIsReady ? (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
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
              cardIndex={0}
              onTapCard={(event) => navigation.navigate('Details', { event })}
              backgroundColor="white"
              stackSize={2}
              infinite
              showSecondCard
              animateOverlayLabelsOpacity

              // NOT WORKING
              // overlayLabels={{
              //   left: {
              //     title: 'NOPE',
              //     element: <OverlayLabel label="NOPE" color="#E5566D" />,
              //     style: {
              //       wrapper: styles.overlayWrapper,
              //     },
              //   },
              //   right: {
              //     title: 'LIKE',
              //     element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              //     style: {
              //       wrapper: {
              //         ...styles.overlayWrapper,
              //         alignItems: 'flex-start',
              //         marginLeft: 30,
              //       },
              //     },
              //   },
              // }}
            />
          </View>
          {/* BUTTONS */}
          <View style={styles.buttonsContainer}>
            <IconButton
              name="remove"
              onPress={handleOnSwipedLeft}
              color="white"
              backgroundColor="#ffb01f"
              size={45}
            />
            <IconButton
              name="undo"
              onPress={handleOnSwipedLeft}
              color="black"
              backgroundColor="#d1d1d1"
              size={20}
            />
            <IconButton
              name="add"
              onPress={handleOnSwipedRight}
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
