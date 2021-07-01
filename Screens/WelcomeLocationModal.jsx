import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Animated,
  ImageBackground,
  Dimensions,
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
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();

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

  const fadeAnim = useRef(new Animated.Value(0)).current;

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
          <Text>
            {reduxLocationValue.coords.latitude !== 0
              ? 'Location success'
              : 'Locating...'}
          </Text>
          {/* ANIMATED WELCOME */}
          <Animated.View // Special animatable View
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={styles.welcome}>Welcome</Text>
          </Animated.View>

          <Animated.View // Special animatable View
            style={{ opacity: fadeAnim }}
          >
            <Text style={styles.selectStationText}>
              Please select a station:
            </Text>
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
            <Text>View AwayDays</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginView}>
          <Text>FOOTER</Text>
        </View>
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
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'flex-end',
    height: 70,
  },
  loginButton: {
    width: 150,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: width,
    borderColor: 'red',
    borderWidth: 2,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 50,
    color: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },

  selectStationText: {
    width: 300,
    paddingHorizontal: 15,
    fontSize: 15,
    color: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  enterButton: {
    width: 150,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 50,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default WelcomeLocationModal;
