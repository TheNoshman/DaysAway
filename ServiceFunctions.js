import dayjs from 'dayjs';
import { getStationTimetable, getStops } from './serviceAPI';

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

// REMOVES DUPLICATE SERVICES FOR API CALL IN SERVICE API
export const removeDuplicateServices = (timetable) => {
  let uniqueServices = [];
  for (const trainService of timetable.departures.all) {
    if (
      !uniqueServices.some(
        (serv) =>
          serv.destination_name === trainService.destination_name &&
          serv.service === trainService.service,
      )
    ) {
      uniqueServices.push(trainService);
    }
  }
  return uniqueServices;
};

let journeyTimetableArray = [{ journeyRoute: [] }];

export const calculateLastStop = async (timetable, userTime) => {
  const timetableArray = await calculateLastTrain(timetable, userTime);
  // console.log('timetbale ARRY', timetableArray);

  console.log('timetable array', timetableArray);

  const departure =
    timetableArray[0].journeyRoute[
      timetableArray[0].journeyRoute.length - 1
    ].departures.calculatedJourneys[0].departingAt.split(':');

  const lastTrainStopsArray =
    timetableArray[0].journeyRoute[
      timetableArray[0].journeyRoute.length - 1
    ].departures.calculatedJourneys[0].callingAt.slice(1);

  console.log('departure = ', departure);
  console.log('last stops arr = ', lastTrainStopsArray);

  const stationDepartureTime = dayjs()
    .hour(departure[0])
    .minute(departure[1])
    .second(0);

  const index = lastTrainStopsArray.findIndex((stop) => {
    console.log('stop', stop);

    const arrival = stop.aimed_arrival_time.split(':');
    const stationArrivalTime = dayjs()
      .hour(arrival[0])
      .minute(arrival[1])
      .second(0);
    console.log('arrive', arrival);

    const journeyTime = stationArrivalTime.diff(
      stationDepartureTime,
      'minutes',
    );
    timetableArray[timetableArray.length - 1].remaining_time -= journeyTime;
    console.log('journey time = ', journeyTime);
    console.log(
      'user time remainign = ',
      timetableArray[timetableArray.length - 1].remaining_time,
    );

    console.log(
      'is journey time greater than user time',
      journeyTime > timetableArray[timetableArray.length - 1].remaining_time,
    );

    return (
      journeyTime > timetableArray[timetableArray.length - 1].remaining_time
    );
  });
  console.log('index func = ', index);
  console.log('JOURNEY AFTER ALGO', journeyTimetableArray);

  // HANDLES IF NEXT STOP ON NEW TRAIN IS OVER TIME -> RETURNS LAST STOP FROM PREVIOUS TRAIN
  if (!lastTrainStopsArray[index - 1]) {
    console.log('journey timetable array', journeyTimetableArray);
    const train =
      journeyTimetableArray[0].journeyRoute[
        journeyTimetableArray[0].journeyRoute.length - 2
      ].departures.calculatedJourneys[0];

    const journeyTT = train.callingAt[train.callingAt.length - 1];
    const x = [...journeyTimetableArray, { destination: journeyTT }];
    journeyTimetableArray = [{ journeyRoute: [] }];
    return x;
  } else {
    const y = [
      ...journeyTimetableArray,
      { destination: lastTrainStopsArray[index - 1] },
    ];
    journeyTimetableArray = [{ journeyRoute: [] }];
    return y;
  }
};

// CALCULATE DIFFERENCE BETWEEN DEPARTURE TIME AND ARRIVAL TIME
// IF TRUE, JOURNEY OK. IF FALSE, JOURNEY TOO LONG
export const calculateLastTrain = async (timetable, userTime) => {
  console.log('in calclasttrain, timetable = ', timetable);
  console.log('user journey time = ', userTime);

  journeyTimetableArray[0].journeyRoute.push(timetable);

  const callingAtArray =
    timetable.departures.calculatedJourneys[
      timetable.departures.calculatedJourneys.length - 1
    ].callingAt;

  const departure = callingAtArray[0].aimed_departure_time.split(':');
  const stationDepartureTime = dayjs()
    .hour(departure[0])
    .minute(departure[1])
    .second(0);

  let arrival =
    callingAtArray[callingAtArray.length - 1].aimed_arrival_time.split(':');
  let stationArrivalTime = dayjs()
    .hour(arrival[0])
    .minute(arrival[1])
    .second(0);

  let journeyTime = stationArrivalTime.diff(stationDepartureTime, 'minutes');
  console.log('total journey time for this trip = ', journeyTime);
  console.log('time remaining = ', userTime - journeyTime);

  // BASE CASE
  if (journeyTime > userTime) {
    // const returnJourneyArray = journeyTimetableArray.slice();
    console.log('in base case', journeyTimetableArray);

    return journeyTimetableArray;
  } else {
    journeyTimetableArray[1] = { remaining_time: userTime - journeyTime };
    console.log('in recursive step, getting new station timetable');
    const nextTimetable = await getStops(
      await getStationTimetable(
        callingAtArray[callingAtArray.length - 1].station_code,
      ),
    );
    console.log('next timetable = ', nextTimetable);

    // RECURSIVE CALL
    return calculateLastTrain(nextTimetable, userTime - journeyTime);
  }
};
