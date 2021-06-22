import dayjs from 'dayjs';
import { getStationTimetable } from './serviceAPI';

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
  return uniqueServices;
};

let journeyTimetableArray = [];

export const calculateLastStop = async (timetable, userTime) => {
  const timetableArray = await calculateLastTrain(timetable, userTime);
  console.log('timetable array', timetableArray);
  let userTimeRemaining = timetableArray[0].remaining_time;

  const departure =
    timetableArray[
      timetableArray.length - 1
    ].departures.all[0].callingAt[0].aimed_departure_time.split(':');
  const lastTrainStopsArray =
    timetableArray[timetableArray.length - 1].departures.all[0].callingAt.slice(
      1,
    );

  console.log('departure = ', departure);

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
    userTimeRemaining -= journeyTime;
    console.log('journey time = ', journeyTime);
    console.log('user time remainign = ', userTimeRemaining);

    console.log(
      'is journey time greater than user time',
      journeyTime > userTimeRemaining,
    );

    return journeyTime > userTimeRemaining;
  });
  console.log('index func = ', index);

  // journeyTimetableArray = [];
  if (!lastTrainStopsArray[index - 1]) {
    console.log('journey timetable array', journeyTimetableArray);

    return journeyTimetableArray[journeyTimetableArray.length - 2].departures
      .all[0].callingAt[
      journeyTimetableArray[journeyTimetableArray.length - 2].departures.all[0]
        .callingAt.length - 1
    ];
  } else {
    return lastTrainStopsArray[index - 1];
  }
};

// CALCULATE DIFFERENCE BETWEEN DEPARTURE TIME AND ARRIVAL TIME
// IF TRUE, JOURNEY OK. IF FALSE, JOURNEY TOO LONG
export const calculateLastTrain = async (timetable, userTime) => {
  // console.log('in calclasttrain, timetable = ', timetable);
  // console.log('user journey time = ', userTime);
  journeyTimetableArray.push(timetable);
  const callingAtArray = timetable.departures.all[0].callingAt;

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
  // console.log('total journey time for this trip = ', journeyTime);
  // console.log('time remaining = ', userTime - journeyTime);

  // BASE CASE
  if (journeyTime > userTime) {
    // const returnJourneyArray = journeyTimetableArray.slice();
    // console.log('in base case');
    return journeyTimetableArray;
  } else {
    journeyTimetableArray.unshift({ remaining_time: userTime - journeyTime });
    // console.log('in recursive step');
    const nextTimetable = await getStationTimetable(
      callingAtArray[callingAtArray.length - 1].station_code,
    );
    // RECURSIVE CALL
    return calculateLastTrain(nextTimetable, userTime - journeyTime);
  }
};
