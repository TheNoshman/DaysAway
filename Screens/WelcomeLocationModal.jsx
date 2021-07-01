import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Animated,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';
import changeLocalTrainStationsAction from '../actionCreators/changeLocalTrainStationsAction';

// SERVICE API FUNCTIONS
import { distanceCalculator } from '../serviceFunctions';
import { findLocalTrainStations, getLocationAPI } from '../serviceAPI';

// PICKERS SELECT
import DropDownPicker from '../Components/DropDownPicker';
import TimePicker from '../Components/TimePicker';
import changeTravelTimeAction from '../actionCreators/changeTravelTimeAction';
import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const WelcomeLocationModal = ({ navigation }) => {
  // ################## VARIABLES ##################
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);
  const reduxSeenDestinations = useSelector(
    (state) => state.reduxSeenDestinationCache,
  );
  const dispatch = useDispatch();

  // ################## FUNCTIONS ##################
  // CALL TO LOCATION API, SAVES LOCATION AND STATION LIST TO REDUX
  useEffect(() => {
    (async () => {
      // SETS VALUE OF REDUX USER TIME TO MIDNIGHT LAST NIGHT
      if (reduxUserTravelTime.fullTime === 0) {
        const fullTime = new Date();
        fullTime.setHours(0, 0, 0, 0);
        dispatch(changeTravelTimeAction({ fullTime }));
      }
      // ANIMATION FOR WELCOME TRIGGER
      Animated.timing(welcomeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();

      Animated.sequence([
        Animated.delay(3500),
        Animated.timing(mapAndWordsAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();

      // LOCATION
      const locationResult = await getLocationAPI();
      dispatch(changeUserLocationAction(locationResult));
      const stationAPIResult = await findLocalTrainStations(locationResult);
      const stationList = stationAPIResult.member.map((el) => {
        const distance = distanceCalculator(
          locationResult.coords.latitude.toFixed(3),
          locationResult.coords.longitude.toFixed(3),
          el.latitude.toFixed(3),
          el.longitude.toFixed(3),
        ).toFixed(1);
        return {
          label: `${el.name}, ${distance} miles away`,
          value: { code: el.station_code, name: el.name },
        };
      });
      dispatch(changeLocalTrainStationsAction(stationList));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const welcomeAnim = useRef(new Animated.Value(0)).current;
  const mapAndWordsAnim = useRef(new Animated.Value(0)).current;
  // const

  // NAVIGATION HANDLER -> ENTERS THE MAIN STACK
  const handleSubmit = useCallback(async () => {
    if (reduxSelectedStation.code === null) {
      Alert.alert(
        'No station selected',
        'Please select the train station you would like to depart from.',
        [{ text: 'Lets go!' }],
      );
    } else if (!reduxUserTravelTime.dayjsTime) {
      Alert.alert(
        'No journey time selected',
        'Please select the amount of time you would like to spend travelling',
        [{ text: 'Lets go!' }],
      );
    } else {
      navigation.navigate('Main');
    }
    // Added dependency, might cause issues later
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxSelectedStation, reduxUserTravelTime.dayjsTime]);

  // ################## RENDER COMPONENT ##################
  // ################## RENDER COMPONENT ##################
  // ################## RENDER COMPONENT ##################
  // ################## RENDER COMPONENT ##################
  // ################## RENDER COMPONENT ##################
  // ################## RENDER COMPONENT ##################
  return (
    <ImageBackground
      source={require('../assets/modalBackground.jpg')}
      style={styles.imageBackground}
      blurRadius={8}
      fadeDuration={300}
    >
      {/* LOG IN BUTTON */}
      <SafeAreaView style={styles.entireContainer}>
        <View style={styles.loginView}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => console.log(reduxLocationValue)}
          >
            <Text>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          {/* MAP IMAGE */}
          <Animated.View
            style={{
              opacity: mapAndWordsAnim,
            }}
          >
            <Image source={require('../assets/map.png')} style={styles.logo} />
          </Animated.View>

          <Text>
            {reduxLocationValue.coords.latitude !== 0
              ? 'Location success'
              : 'Locating...'}
          </Text>
          {/* ANIMATED WELCOME */}
          <Animated.View // Special animatable View
            style={{
              opacity: welcomeAnim,
              transform: [
                {
                  translateY: welcomeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={styles.welcome}>Welcome</Text>
          </Animated.View>

          {/* SELECT STATION ANIMATED WORDS */}
          <Animated.View // Special animatable View
            style={{ opacity: mapAndWordsAnim }}
          >
            <Text style={styles.text}>Please select a station:</Text>
          </Animated.View>

          {/* STATION DROPDOWN PICKER */}
          <DropDownPicker />
          {/* TIME PICKER */}
          <TimePicker />
          {/* ENTER APP TOUCHABLE */}
          <TouchableOpacity
            style={styles.enterButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.enterButtonText}>Search AwayDays</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerView} />
      </SafeAreaView>
    </ImageBackground>
  );
};

// ################## STYLES ##################
const styles = StyleSheet.create({
  imageBackground: { width: '100%', height: '100%' },
  entireContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loginView: {
    width: width,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'flex-end',
    height: 70,
  },
  loginButton: {
    borderColor: 'red',
    borderWidth: 2,
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: width,
    borderColor: 'red',
    borderWidth: 2,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcome: {
    fontSize: 50,
    color: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },

  text: {
    width: 300,
    paddingHorizontal: 15,
    fontSize: 15,
    color: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  enterButtonText: {
    fontSize: 20,
    color: 'white',
  },
  enterButton: {
    width: 200,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerView: {
    height: 150,
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default WelcomeLocationModal;
