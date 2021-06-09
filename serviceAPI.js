import * as Location from 'expo-location';

// npm install babel-plugin-inline-dotenv
// .ENV VARIABLES
const { API_KEY } = process.env;
const { API_ID } = process.env;
const getStationsListAPI = 'http://transportapi.com/v3/uk/places.json?';
const getTimetableAPI = 'https://transportapi.com/v3/uk/train/station/';

// GET USER LOCATION API
export const getLocationAPI = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return console.error('Permission to access location was denied');
  }
  const locationResult = await Location.getCurrentPositionAsync({});
  return locationResult;
};

// GET LOCAL TRAIN STATIONS REQUEST
export const findLocalTrainStations = (userLocationData) => {
  const searchType = 'train_station';
  const min_lat = (userLocationData.coords.latitude - 0.1).toFixed(3);
  const min_lon = (userLocationData.coords.longitude - 0.1).toFixed(3);
  const max_lat = (userLocationData.coords.latitude + 0.1).toFixed(3);
  const max_lon = (userLocationData.coords.longitude + 0.1).toFixed(3);
  return fetch(
    `${getStationsListAPI}min_lat=${min_lat}&min_lon=${min_lon}&max_lat=${max_lat}&max_lon=${max_lon}&type=${searchType}&app_id=${API_ID}&app_key=${API_KEY}`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`${err.message}`);
    });
};

// GET TRAIN STATION TIMETABLE REQUEST
export const getStationTimetable = (stnCode) => {
  const stationCode = `${stnCode}/live.json?`;
  return fetch(
    `${getTimetableAPI}${stationCode}app_id=${API_ID}&app_key=${API_KEY}&darwin=false&train_status=passenger`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .then((result) => console.log('timetable= ', result))
    .catch((err) => {
      console.log(`${err.message}`);
    });
};

// LIVE TIMETABLE SEARCH
// https://transportapi.com/v3/uk/train/station/
// STA/live.json?
// app_id=c5659164&
// app_key=2eb3a5797c5e941f24e87ea3d0afd748&
// darwin=false&
// train_status=passenger
