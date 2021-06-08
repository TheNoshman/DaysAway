import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import changeUserLocationAction from '../actionCreators/changeUserLocationAction';
import changeSelectedTrainStationAction from '../actionCreators/changeSelectedTrainStationAction';

// expo install expo-location
// LOCATION
import { getLocationAPI } from '../serviceAPI';

// SERVICE API
import { findLocalTrainStations } from '../serviceAPI';
import changeLocalTrainStationsAction from '../actionCreators/changeLocalTrainStationsAction';

// STATION PICKER SELECT
import RNPickerSelect from 'react-native-picker-select';

const LocationComponent = ({ navigation }) => {
  // Redux values from store
  const reduxLocationValue = useSelector((state) => state.reduxUserLocation);
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  // dispatches actions to redux
  const dispatch = useDispatch();

  // ################## FUNCTIONS ##################
  // CALL TO LOCATION API, SAVES LOCATION AND STATION LIST TO REDUX
  const getLocation = async () => {
    const locationResult = await getLocationAPI();
    dispatch(changeUserLocationAction(locationResult));
    const stationAPIResult = await findLocalTrainStations(locationResult);
    const stationList = stationAPIResult.member.map((el) => {
      return { label: el.name, value: el.station_code };
    });
    dispatch(changeLocalTrainStationsAction(stationList));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => getLocation()}>
        <Text>Touch to get location</Text>
      </TouchableOpacity>
      <Text>
        Latitude ={' '}
        {reduxLocationValue ? reduxLocationValue.coords.latitude : 'pending'}
      </Text>
      <Text>
        Longitude ={' '}
        {reduxLocationValue ? reduxLocationValue.coords.longitude : 'pending'}
      </Text>
      {/* STATION PICKER */}
      {reduxStationList.length > 1 ? (
        <RNPickerSelect
          value={reduxSelectedStation}
          style={{
            ...styles,
            iconContainer: {
              top: 18,
              right: 18,
            },
          }}
          onValueChange={(value) =>
            dispatch(changeSelectedTrainStationAction(value))
          }
          useNativeAndroidPickerStyle={false}
          // placeholder={{ label: 'Select a station...', value: null }}
          placeholder={{}}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="red" />;
          }}
          items={reduxStationList}
        />
      ) : null}
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
