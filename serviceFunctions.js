import dayjs from 'dayjs';
import { getStationTimetable, getStops } from './serviceAPI';

// DISTANCE CALCULATOR BETWEEN TWO COORDS, USED FOR STATION DISTANCE FROM USER
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

// CHECKS CACHE FOR TIMETABLE, AVOIDS UNNECESSARY API CALLS
export const getCachedTimetable = (reduxStore, selectedStation) => {
  return reduxStore.filter(
    (timetable) => timetable.station_code === selectedStation,
  );
};

// DATA BANK USED FOR STORING JOURNEY DETAILS AS ALGORITHM WORKS
let journeyTimetableArray = [
  [{ journeyRoute: [] }],
  [{ journeyRoute: [] }],
  [{ journeyRoute: [] }],
];

// DATA STORE FOR AVOIDING REPEAT DESTINATIONS
let seenDests = [];

// CALCULATES THE LAST POSSIBLE STOP WITHIN THE TIME FRAME
export const calculateLastStop = async (timetable, userTime, journeyIndex) => {
  // GET LAST USEABLE TRAIN
  const timetableArray = await calculateLastTrain(
    timetable,
    userTime,
    journeyIndex,
  );

  // REMAINING TIME AFTER LAST USEABLE TRAIN CONNECTION
  let timeRemaining = timetableArray[journeyIndex][1].remainingTime;

  // Removes first 'stop' which is departing station
  const lastTrainStopsArray =
    timetableArray[journeyIndex][0].journeyRoute[
      timetableArray[journeyIndex][0].journeyRoute.length - 1
    ].departures.calculatedJourneys[journeyIndex].callingAt.slice(1);

  // Station departure time
  const departure =
    timetableArray[journeyIndex][0].journeyRoute[
      timetableArray[journeyIndex][0].journeyRoute.length - 1
    ].departures.calculatedJourneys[journeyIndex].departingAt.split(':');
  const stationDepartureTime = dayjs()
    .hour(departure[0])
    .minute(departure[1])
    .second(0);

  timetableArray[journeyIndex].push({ timeRemainingAfterStops: [] });

  // FIND INDEX OF LAST WORKABLE STOP
  const index = lastTrainStopsArray.findIndex((stop) => {
    const arrival = stop.aimed_arrival_time.split(':');
    const stationArrivalTime = dayjs()
      .hour(arrival[0])
      .minute(arrival[1])
      .second(0);

    const journeyTime = stationArrivalTime.diff(
      stationDepartureTime,
      'minutes',
    );
    const time = timeRemaining - journeyTime;
    timetableArray[journeyIndex][2].timeRemainingAfterStops.push(time);
    return time < 0;
  });

  const journeyStopTimes =
    timetableArray[journeyIndex][2].timeRemainingAfterStops;

  if (timetableArray[journeyIndex][2].timeRemainingAfterStops.length > 1) {
    timetableArray[journeyIndex][1].remainingTime =
      journeyStopTimes[journeyStopTimes.length - 2];
  } else if (
    timetableArray[journeyIndex][2].timeRemainingAfterStops.length === 1 &&
    timetableArray[journeyIndex][2].timeRemainingAfterStops[0] > 0
  ) {
    timetableArray[journeyIndex][1].remainingTime =
      journeyStopTimes[journeyStopTimes.length - 1];
  }

  const tt0jr = timetableArray[journeyIndex][0].journeyRoute;

  // HANDLES IF NEXT STOP ON NEW TRAIN IS OVER TIME -> RETURNS LAST STOP FROM PREVIOUS TRAIN
  if (index > 0) {
    const dest =
      tt0jr[tt0jr.length - 1].departures.calculatedJourneys[journeyIndex]
        .callingAt[index];
    if (seenDests.includes(dest.station_code)) {
      timetableArray[journeyIndex].push({
        destination:
          tt0jr[tt0jr.length - 1].departures.calculatedJourneys[journeyIndex]
            .callingAt[index - 1],
      });
      return timetableArray[journeyIndex];
    } else {
      timetableArray[journeyIndex].push({
        destination: dest,
      });
      seenDests.push(dest.station_code);
    }
    return timetableArray[journeyIndex];
  } else if (index < 0 || tt0jr.length === 1) {
    const dest =
      tt0jr[0].departures.calculatedJourneys[
        tt0jr[0].departures.calculatedJourneys.length - 1
      ].callingAt[
        tt0jr[0].departures.calculatedJourneys[
          tt0jr[0].departures.calculatedJourneys.length - 1
        ].callingAt.length - 1
      ];
    if (seenDests.includes(dest.station_code)) {
      timetableArray[journeyIndex].push({
        destination:
          tt0jr[0].departures.calculatedJourneys[[journeyIndex]].callingAt[
            tt0jr[0].departures.calculatedJourneys[[journeyIndex]].callingAt
              .length - 2
          ],
      });
      return timetableArray[journeyIndex];
    } else {
      timetableArray[journeyIndex].push({
        destination: dest,
      });
      return timetableArray[journeyIndex];
    }
  } else {
    const dest =
      tt0jr[tt0jr.length - 2].departures.calculatedJourneys[journeyIndex]
        .callingAt[
        tt0jr[tt0jr.length - 2].departures.calculatedJourneys[journeyIndex]
          .callingAt.length - 1
      ];
    if (seenDests.includes(dest.station_code)) {
      timetableArray[journeyIndex].push({
        destination:
          tt0jr[tt0jr.length - 2].departures.calculatedJourneys[journeyIndex]
            .callingAt[
            tt0jr[tt0jr.length - 2].departures.calculatedJourneys[journeyIndex]
              .callingAt.length - 2
          ],
      });
      return timetableArray[journeyIndex];
    } else {
      timetableArray[journeyIndex].push({
        destination: dest,
      });
      return timetableArray[journeyIndex];
    }
  }
};

// CALCULATES THE LAST POSSIBLE TRAIN WITHIN THE TIME FRAME
// CHECKS LAST STOP, IF TIME REMAINING, FIND A CONNECTING TRAIN
export const calculateLastTrain = async (timetable, userTime, journeyIndex) => {
  // Adds the whole timetable from stone to journey route
  journeyTimetableArray[journeyIndex][0].journeyRoute.push(timetable);

  const callingAtArray =
    timetable.departures.calculatedJourneys[journeyIndex].callingAt;

  // CREATE DAY.JS TIME FOR CALCULATIONS
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

  // BASE CASE
  if (journeyTime > userTime) {
    journeyTimetableArray[journeyIndex][1] = { remainingTime: userTime };
    return journeyTimetableArray;
  } else {
    // ELSE FIND NEXT TIMETABLE AND RUN FUNCTION AGAIN
    journeyTimetableArray[journeyIndex][1] = {
      remainingTime: userTime - journeyTime,
    };
    const nextTimetable = await getStops(
      await getStationTimetable(
        callingAtArray[callingAtArray.length - 1].station_code,
      ),
      journeyIndex,
    );
    // RECURSIVE CALL
    return calculateLastTrain(
      nextTimetable,
      userTime - journeyTime,
      journeyIndex,
    );
  }
};
