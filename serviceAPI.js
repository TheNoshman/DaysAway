import * as Location from 'expo-location';
import { removeDuplicateServices } from './serviceFunctions';

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
export const findLocalTrainStations = async (userLocationData) => {
  console.log('API CALL - FIND LOCAL STATIONS');

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
export const getStationTimetable = async (code) => {
  console.log('API CALL - GET STATION TIMETABLE');
  const stationCode = `${code}/live.json?`;
  const res = await fetch(
    `${getTimetableAPI}${stationCode}app_id=${API_ID}&app_key=${API_KEY}&darwin=false&train_status=passenger`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`${err.message}`);
    });
  const withStops = await getStops(res);
  return withStops;
};

// GET TRAIN STOPS
const getStops = async (timetable) => {
  console.log('API CALL - GET DEPARTURES FROM STATION');
  // REMOVES DUPLICATE SERVICES FOR API CALL
  let uniqueServices = removeDuplicateServices(timetable);
  const index = Math.floor(Math.random() * uniqueServices.length);
  console.log('index ', index);

  timetable.departures.all = [uniqueServices[index]];

  // API CALL TO GET STOPS
  const callingAtResult = await fetch(timetable.departures.all[0].timetableURL)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`${err.message}`);
    });

  // REMOVES STOPS FROM THE PAST
  const remainingStops = callingAtResult.stops.slice(
    callingAtResult.stops.findIndex(
      (el) => el.station_code === timetable.station_code,
    ),
  );

  timetable.departures.all[0].callingAt = remainingStops;
  return timetable;
};

// CHECKS CACHE FOR TIMETABLE
export const getCachedTimetable = (reduxStore, selectedStation) => {
  return reduxStore.filter(
    (timetable) => timetable.station_code === selectedStation,
  );
};
