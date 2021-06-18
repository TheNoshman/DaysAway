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

// ASSIGNS API 'CALLING AT' RESULTS TO SERVICES IN TIMETABLE
export const assignStopsToTrain = (timetable, stopsArray) => {
  console.log('assign stops timetable = ', timetable);
  console.log('assign stops stopsarray = ', stopsArray);

  timetable.departures.all.forEach((train, index) => {
    if (stopsArray.length === 1) {
      console.log('indide length 1 in assign');

      timetable.departures.all[0].callingAt = stopsArray[0].callingAtResult;
    } else {
      const stopsIndex = stopsArray.findIndex(
        (obj) =>
          obj.service === train.service &&
          obj.destination === train.destination_name,
      );
      timetable.departures.all[index].callingAt =
        stopsArray[stopsIndex].callingAtResult;
    }
  });
  return timetable;
};

// FILTERS OUT SAME SERVICES AT DIFFERENT TIMES FOR HOME DISPLAY
export const uniqueServicesOnly = (timetable) => {
  timetable.departures.unique = [];
  timetable.departures.all.forEach((train) => {
    if (
      timetable.departures.unique.findIndex(
        (serv) =>
          train.destination_name === serv.destination_name &&
          train.service === serv.service,
      ) === -1
    ) {
      timetable.departures.unique.push(train);
    }
  });
  return timetable;
};

// CALCULATE DIFFERENCE BETWEEN DEPARTURE TIME AND ARRIVAL TIME
// IF TRUE, JOURNEY OK. IF FALSE, JOURNEY TOO LONG
export const calculateLastStop = async (timetable, userTime) => {
  // console.log('timetable in calculatelaststop', timetable);
  const userTravelTime = userTime.diff(
    dayjs().hour(0).minute(0).second(0),
    'minutes',
  );
  console.log('user travel time = ', userTravelTime);

  timetable.departures.unique.forEach(async (train) => {
    const departure = train.aimed_departure_time.split(':');
    const stationDepartureTime = dayjs()
      .hour(departure[0])
      .minute(departure[1])
      .second(0);

    const arrival =
      train.callingAt[train.callingAt.length - 1].aimed_arrival_time.split(':');
    const stationArrivalTime = dayjs()
      .hour(arrival[0])
      .minute(arrival[1])
      .second(0);

    // console.log('arr', stationArrivalTime);
    // console.log('dep', stationDepartureTime);
    // console.log('usr', userTravelTime);
    const journeyTime = stationArrivalTime.diff(
      stationDepartureTime,
      'minutes',
    );

    if (journeyTime < userTravelTime) {
      const nextTimetable = await getStationTimetable(
        train.callingAt[train.callingAt.length - 1].station_code,
        true,
      );

      console.log('remaining journey time = ', userTravelTime - journeyTime);
      console.log('next timetable = ', nextTimetable);
      return;

      // calculateLastStop(nextTimetable, userTime - journeyTime);
    } else {
      console.log('end');
      return;
    }
  });
};
