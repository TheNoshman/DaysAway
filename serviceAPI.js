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
export const findLocalTrainStations = async (userLocationData) => {
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
  // REMOVES DUPLICATE SERVICES FOR API CALL
  let uniqueServices = [];
  for (const trainService of timetable.departures.all) {
    if (
      !uniqueServices.some(
        (serv) =>
          serv.destination === trainService.destination_name &&
          serv.serviceCode === trainService.service,
      )
    ) {
      uniqueServices.push({
        serviceCode: trainService.service,
        destination: trainService.destination_name,
        timetableURL: trainService.service_timetable.id,
      });
    }
  }
  // API CALL TO GET STOPS
  const promises = uniqueServices.map(async (service) => {
    const callingAtResult = await fetch(service.timetableURL)
      .then((result) =>
        result.status <= 400 ? result : Promise.reject(result),
      )
      .then((result) => result.json())
      .catch((err) => {
        console.log(`${err.message}`);
      });
    // REMOVES STOPS FROM THE PAST
    const remainingStops = callingAtResult.stops.slice(
      callingAtResult.stops.findIndex(
        (el) => el.station_code === timetable.station_code,
      ) + 1,
    );
    return {
      service: service.serviceCode,
      destination: service.destination,
      callingAtResult: remainingStops,
    };
  });
  const stopsArray = await Promise.all(promises);
  // ASSIGNS API RESULTS TO SERVICES IN TIMETABLE
  timetable.departures.all.forEach((train, index) => {
    const stopsIndex = stopsArray.findIndex(
      (obj) =>
        obj.service === train.service &&
        obj.destination === train.destination_name,
    );
    timetable.departures.all[index].callingAt =
      stopsArray[stopsIndex].callingAtResult;
  });
  return timetable;
};

// CHECKS CACHE FOR TIMETABLE
export const getCachedTimetable = (reduxStore, selectedStation) => {
  return reduxStore.filter(
    (timetable) => timetable.station_code === selectedStation,
  );
};

// DISTANCE CALC BETWEEN TWO COORDS
export const distanceCalculator = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
};
