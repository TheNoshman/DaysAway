import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// REDUX
import { useSelector } from 'react-redux';

// STATION PICKER SELECT
import DropDownPicker from '../Components/DropDownPicker';
import TimePicker from '../Components/TimePicker';

const LocationComponent = ({ navigation }) => {
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const reduxTimetableCache = useSelector((state) => state.reduxTimetableCache);
  const reduxUserTravelTime = useSelector((state) => state.reduxUserTravelTime);

  return (
    <View style={styles.container}>
      <Text>
        Latitude ={' '}
        {reduxLocationValue ? reduxLocationValue.coords.latitude : 'pending'}
      </Text>
      <Text>
        Longitude ={' '}
        {reduxLocationValue ? reduxLocationValue.coords.longitude : 'pending'}
      </Text>

      {/* STATION PICKER */}
      <DropDownPicker />

      {/* TIME PICKER */}
      <TimePicker />

      {/* ############ TESTING ############# */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxLocationValue)}
      >
        <Text>get redux location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxStationList)}
      >
        <Text>get redux station list</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxSelectedStation)}
      >
        <Text>get redux selected station</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxTimetableCache)}
      >
        <Text>get redux timetable</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(reduxUserTravelTime)}
      >
        <Text>get user time</Text>
      </TouchableOpacity>
    </View>
  );
};

// ################## STYLES ##################
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    width: 150,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputAndroid: {
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default LocationComponent;
