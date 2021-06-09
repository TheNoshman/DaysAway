import * as Location from 'expo-location';

// npm install babel-plugin-inline-dotenv
// .ENV VARIABLES
const { API_KEY } = process.env;
const { API_ID } = process.env;
const getStationsListAPI = 'http://transportapi.com/v3/uk/places.json?';
const getTimetableAPI = 'https://transportapi.com/v3/uk/train/station/';

export const getLocationAPI = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return console.error('Permission to access location was denied');
  }
  const locationResult = await Location.getCurrentPositionAsync({});
  return locationResult;
};

// LOCAL TRAIN STATIONS GET REQUEST
export const findLocalTrainStations = (userLocationData) => {
  const searchType = 'train_station';

  // USER LOCATION DATA FOR FETCH
  const min_lat = (userLocationData.coords.latitude - 0.1).toFixed(3);
  const min_lon = (userLocationData.coords.longitude - 0.1).toFixed(3);
  const max_lat = (userLocationData.coords.latitude + 0.1).toFixed(3);
  const max_lon = (userLocationData.coords.longitude + 0.1).toFixed(3);

  return (
    // API CALL
    fetch(
      `${getStationsListAPI}min_lat=${min_lat}&min_lon=${min_lon}&max_lat=${max_lat}&max_lon=${max_lon}&type=${searchType}&app_id=${API_ID}&app_key=${API_KEY}`,
    )
      .then((result) =>
        result.status <= 400 ? result : Promise.reject(result),
      )
      .then((result) => result.json())
      // .then((result) => sorter(result))
      // .then((result) => console.log('stations result', result))
      .catch((err) => {
        console.log(`${err.message}`);
      })
  );
};
