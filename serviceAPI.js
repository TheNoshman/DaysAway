import dayjs from 'dayjs';
import * as Location from 'expo-location';
import { calculateLastStop } from './serviceFunctions';

// npm install babel-plugin-inline-dotenv
// .ENV VARIABLES
const { TRANSPORT_API_KEY } = process.env;
const { TRANSPORT_API_ID } = process.env;
const { PHOTOS_API_KEY } = process.env;
// const { PHOTOS_SECRET_KEY } = process.env;
const { OPENTRIPMAP_API_KEY } = process.env;

const getStationsListAPI = 'http://transportapi.com/v3/uk/places.json?';
const getTimetableAPI = 'https://transportapi.com/v3/uk/train/station/';
const opentripAPI = 'https://api.opentripmap.com/0.1/en/places/';
const unsplashAPI = 'https://api.unsplash.com/search/photos/?client_id=';

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
    `${getStationsListAPI}min_lat=${min_lat}&min_lon=${min_lon}&max_lat=${max_lat}&max_lon=${max_lon}&type=${searchType}&app_id=${TRANSPORT_API_ID}&app_key=${TRANSPORT_API_KEY}`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`API CALL ERROR - ${err.message}`);
    });
};

// GET TRAIN STATION TIMETABLE
export const getStationTimetable = async (code) => {
  console.log('API CALL - GET STATION TIMETABLE');
  const stationCode = `${code}/live.json?`;
  const res = await fetch(
    `${getTimetableAPI}${stationCode}app_id=${TRANSPORT_API_ID}&app_key=${TRANSPORT_API_KEY}&darwin=false&train_status=passenger`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(`API CALL ERROR - ${err.message}`);
    });
  if (!res.departures.all.length) {
    console.log('NO DEPARTURES TO DISPLAY, RETURNING');
    return;
  }
  res.departures.calculatedJourneys = [{}, {}, {}];
  return res;
};

// GET TRAIN STOPS
export const getStops = async (timetable, index) => {
  console.log(
    'API CALL - GET STATION STOPS FOR TRAIN, TIMETABLE PASSED IN = ',
    timetable,
    index,
  );
  const journeyRef = timetable.departures.all[index];

  // API CALL TO GET STOPS
  timetable.departures.calculatedJourneys[index] = {
    from: timetable.station_name,
    to: journeyRef.destination_name,
    id: journeyRef.train_uid,
    departingAt: journeyRef.aimed_departure_time,
    callingAt: await fetch(journeyRef.service_timetable.id)
      .then((result) =>
        result.status <= 400 ? result : Promise.reject(result),
      )
      .then((result) => result.json())
      .then((result) =>
        result.stops.splice(
          result.stops.findIndex(
            (el) => el.station_code === timetable.station_code,
          ),
        ),
      )
      .catch((err) => {
        console.log(`getStops API CALL ERROR - ${err.message}`);
      }),
  };
  return timetable;
};

export const getPlaceLocation = async (destination) => {
  if (destination === 'University') {
    destination = 'Birmingham';
  } else if (destination === 'Bache') {
    destination = 'Chester';
  }
  const firstWord = destination.split(' ');
  console.log('API CALL - FIND PLACE LOCATION', firstWord[0]);
  return fetch(
    `${opentripAPI}geoname?apikey=${OPENTRIPMAP_API_KEY}&name=${firstWord[0]}&country=gb`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(
        `getPlaceLocation API CALL ERROR - ${err.message}, input = ${destination}`,
      );
    });
};

export const getListOfPlaces = async (location) => {
  console.log('API CALL - GET LOCAL PLACES', location);
  return fetch(
    `${opentripAPI}radius?apikey=${OPENTRIPMAP_API_KEY}&radius=3000&limit=10&offset=0&lon=${location.lon}&lat=${location.lat}`,
  )
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())

    .catch((err) => {
      console.log(
        `getListOfPlaces API CALL ERROR - ${err.message}, input = ${location}`,
      );
    });
};
// https://api.unsplash.com/photos/?client_id=kj-0LfJ8y2owoiMWHzP14JZXWN1nIXWwOcfnrKqgXHE&page=1&query=church
export const getCardImages = async (searchTerm = 'uk garden') => {
  // uk-church
  console.log('API CALL - GET UNSPLASH CARD IMAGES', searchTerm);
  return fetch(`${unsplashAPI}${PHOTOS_API_KEY}&query=${searchTerm}&per_page=1`)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .catch((err) => {
      console.log(
        `getPlaceLocation API CALL ERROR - ${err.message}, input = ${searchTerm}`,
      );
    });
};
// export const getPlaceDetail = async (id) => {
//   console.log('API CALL - GET PLACE DETAIL', id);

//   return fetch(`${opentripAPI}xid/${id}?apikey=${OPENTRIPMAP_API_KEY}`)
//     .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
//     .then((result) => result.json())

//     .catch((err) => {
//       console.log(
//         `getPlaceDetail API CALL ERROR - ${err.message}, input = ${id}`,
//       );
//     });
// };

export const getCardData = async (
  reduxTimetables,
  timetableIndex,
  userJourneyTime,
  time,
  index,
) => {
  const result = await calculateLastStop(
    await getStops(reduxTimetables[timetableIndex], index),
    userJourneyTime,
    index,
  );
  console.log('RESULT IN GET CARDS = ', result);

  const placeLocation = await getPlaceLocation(
    result[3].destination.station_name,
  );
  console.log('PLACE LOCATION IN GET CARDS =', placeLocation);

  const placeList = await getListOfPlaces(placeLocation);

  console.log('PLACELIST IN GET CARDS = ', placeList);

  const cardPhotosPromises = [];
  cardPhotosPromises.push(getCardImages('uk park'));
  cardPhotosPromises.push(getCardImages('uk street'));
  cardPhotosPromises.push(getCardImages('uk pub'));
  cardPhotosPromises.push(getCardImages('uk food'));

  const cardPhotosArray = await Promise.all(cardPhotosPromises);

  console.log('CARD IMAGES ARRAY = ', cardPhotosArray);

  const travelTimeMins = time.payload.dayjsTime
    .subtract(result[1].remainingTime, 'minute')
    .diff(dayjs().hour(0).minute(0).second(0), 'minute');

  const travelTimeDayjs = time.payload.dayjsTime.subtract(
    result[1].remainingTime,
    'minute',
  );
  // MAYBE DESTINATION API CALL FOR PLACE DATA FOR API?
  return {
    result,
    placeList,
    cardPhotosArray,
    travelTimeMins,
    travelTimeDayjs,
  };
};
