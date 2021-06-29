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

// CHECKS CACHE FOR TIMETABLE
export const getCachedTimetable = (reduxStore, selectedStation) => {
  return reduxStore.filter(
    (timetable) => timetable.station_code === selectedStation,
  );
};

let journeyTimetableArray = [
  [{ journeyRoute: [] }],
  [{ journeyRoute: [] }],
  [{ journeyRoute: [] }],
];
let seenDests = [];

export const calculateLastStop = async (timetable, userTime, journeyIndex) => {
  console.log('user time in calc last stop = ', userTime, timetable);
  const timetableArray = await calculateLastTrain(
    timetable,
    userTime,
    journeyIndex,
  );
  console.log('timetable Array from calc last train = ', timetableArray);

  let timeRemaining = timetableArray[1].remainingTime;
  console.log('time remaing at TOP = ', timeRemaining);

  // Removes first 'stop' which is departing station
  const lastTrainStopsArray =
    timetableArray[0].journeyRoute[
      timetableArray[0].journeyRoute.length - 1
    ].departures.calculatedJourneys[0].callingAt.slice(1);

  // Station departure time
  const departure =
    timetableArray[0].journeyRoute[
      timetableArray[0].journeyRoute.length - 1
    ].departures.calculatedJourneys[0].departingAt.split(':');
  const stationDepartureTime = dayjs()
    .hour(departure[0])
    .minute(departure[1])
    .second(0);

  console.log('departure time from station = ', departure);
  console.log(
    'stops array, should be missing departing station = ',
    lastTrainStopsArray,
  );

  timetableArray.push({ timeRemainingAfterStops: [] });

  // FIND INDEX OF LAST WORKABLE STOP
  const index = lastTrainStopsArray.findIndex((stop) => {
    console.log('variable within loop', stop);
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

    const time = timeRemaining - journeyTime;
    console.log('journey time = ', journeyTime);
    console.log('user time remainign = ', timeRemaining);
    console.log('time = ', time);

    timetableArray[2].timeRemainingAfterStops.push(time);

    console.log('TIMETABLE ARRAY WITHIN FIND INDEX LOOP', timetableArray);
    return time < 0;
  });

  console.log('after find index');
  console.log('index, needs to have -1 taken to get correct stop = ', index);
  console.log('TIMETABLE ARRAY = ', timetableArray);
  console.log('original user time = ', userTime);

  const journeyStopTimes = timetableArray[2].timeRemainingAfterStops;

  if (timetableArray[2].timeRemainingAfterStops.length > 1) {
    console.log(
      'TIME REMAINING AFRER STOPS > 1 = TIME REMAINING =',
      journeyStopTimes[journeyStopTimes.length - 1],
    );
    timetableArray[1].remainingTime =
      journeyStopTimes[journeyStopTimes.length - 2];
  } else if (
    timetableArray[2].timeRemainingAfterStops.length === 1 &&
    timetableArray[2].timeRemainingAfterStops[0] > 0
  ) {
    console.log(
      'TIME REMAINING AFTER STOPS IS NOT BIGGER THAN ONE = TIME REMAINING = ',
      journeyStopTimes[journeyStopTimes.length - 1],
    );
    timetableArray[1].remainingTime =
      journeyStopTimes[journeyStopTimes.length - 1];
  }
  const tt0jr = timetableArray[0].journeyRoute;
  // HANDLES IF NEXT STOP ON NEW TRAIN IS OVER TIME -> RETURNS LAST STOP FROM PREVIOUS TRAIN
  if (index > 0) {
    console.log('INDEX IS NOT 0, LAST STEP, TT array = ', timetableArray);
    const dest =
      tt0jr[tt0jr.length - 1].departures.calculatedJourneys[0].callingAt[index];

    if (seenDests.includes(dest.station_code)) {
      console.log(
        'SEEN DESTS INCLUDES, INDEX - 1 AND RETURNING, SEEN = ',
        dest.station_code,
      );
      timetableArray.push({
        destination:
          tt0jr[tt0jr.length - 1].departures.calculatedJourneys[0].callingAt[
            index - 1
          ],
      });
      journeyTimetableArray = [{ journeyRoute: [] }];
      console.log('TO BE RETURNED FROM ALGO = ', timetableArray);
      return timetableArray;
    } else {
      timetableArray.push({
        destination: dest,
      });
      seenDests.push(dest.station_code);
      console.log('SEEN DESTS = ', seenDests);

      journeyTimetableArray = [{ journeyRoute: [] }];
      console.log('TO BE RETURNED FROM ALGO = ', timetableArray);
    }

    return timetableArray;
  } else if (index < 0 || tt0jr.length === 1) {
    console.log('INDEX === -1 OR ONLY ONE JOURNEY');

    const dest =
      tt0jr[0].departures.calculatedJourneys[
        tt0jr[0].departures.calculatedJourneys.length - 1
      ].callingAt[
        tt0jr[0].departures.calculatedJourneys[
          tt0jr[0].departures.calculatedJourneys.length - 1
        ].callingAt.length - 1
      ];
    if (seenDests.includes(dest.station_code)) {
      console.log(
        'SEEN DESTS INCLUDES, INDEX - 1 AND RETURNING, SEEN = ',
        dest.station_code,
      );
      timetableArray.push({
        destination:
          tt0jr[0].departures.calculatedJourneys[
            tt0jr[0].departures.calculatedJourneys.length - 1
          ].callingAt[
            tt0jr[0].departures.calculatedJourneys[
              tt0jr[0].departures.calculatedJourneys.length - 1
            ].callingAt.length - 2
          ],
      });
      journeyTimetableArray = [{ journeyRoute: [] }];
      console.log('TO BE RETURNED FROM ALGO = ', timetableArray);

      return timetableArray;
    } else {
      timetableArray.push({
        destination: dest,
      });
      journeyTimetableArray = [{ journeyRoute: [] }];
      console.log('TO BE RETURNED FROM ALGO = ', timetableArray);

      return timetableArray;
    }
  } else {
    const dest =
      tt0jr[tt0jr.length - 2].departures.calculatedJourneys[
        tt0jr[tt0jr.length - 2].departures.calculatedJourneys.length - 1
      ].callingAt[
        tt0jr[tt0jr.length - 2].departures.calculatedJourneys[
          tt0jr[tt0jr.length - 2].departures.calculatedJourneys.length - 1
        ].callingAt.length - 1
      ];
    if (seenDests.includes(dest.station_code)) {
      timetableArray.push({
        destination:
          tt0jr[tt0jr.length - 2].departures.calculatedJourneys[
            tt0jr[tt0jr.length - 2].departures.calculatedJourneys.length - 1
          ].callingAt[
            tt0jr[tt0jr.length - 2].departures.calculatedJourneys[
              tt0jr[tt0jr.length - 2].departures.calculatedJourneys.length - 1
            ].callingAt.length - 2
          ],
      });
      journeyTimetableArray = [{ journeyRoute: [] }];
      console.log('TO BE RETURNED FROM ALGO = ', timetableArray);

      return timetableArray;
    } else {
      console.log('INDEX IS 0, LAST STEP, TT array = ', timetableArray);
      timetableArray.push({
        destination: dest,
      });
      journeyTimetableArray = [{ journeyRoute: [] }];
      console.log('TO BE RETURNED FROM ALGO = ', timetableArray);

      return timetableArray;
    }
  }
};

// CALCULATE DIFFERENCE BETWEEN DEPARTURE TIME AND ARRIVAL TIME
// IF TRUE, JOURNEY OK. IF FALSE, JOURNEY TOO LONG
export const calculateLastTrain = async (timetable, userTime, journeyIndex) => {
  // Adds the whole timetable from stone to journey route
  console.log('TIMETALE ARRAY  = ', journeyTimetableArray);

  journeyTimetableArray[journeyIndex][0].journeyRoute.push(timetable);

  const callingAtArray =
    timetable.departures.calculatedJourneys[journeyIndex].callingAt;

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
    journeyTimetableArray[journeyIndex][1] = { remainingTime: userTime };
    console.log(
      '##################BASE CASE############',
      journeyTimetableArray,
    );
    console.log('user time in base case =', userTime);
    return journeyTimetableArray;
  } else {
    journeyTimetableArray[journeyIndex][1] = {
      remainingTime: userTime - journeyTime,
    };
    console.log('in recursive step, getting new station timetable');
    const nextTimetable = await getStops(
      await getStationTimetable(
        callingAtArray[callingAtArray.length - 1].station_code,
      ),
      journeyIndex,
    );
    console.log('next timetable = ', nextTimetable);

    // RECURSIVE CALL
    return calculateLastTrain(
      nextTimetable,
      userTime - journeyTime,
      journeyIndex,
    );
  }
};
